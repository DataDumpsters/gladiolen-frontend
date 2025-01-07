"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Confirmdeletemodal from "@/app/components/modals/Confirmdeletemodal";
import Usermodal from "@/app/components/modals/Usermodal";
import { useUserStore } from "@/app/stores/userStore";

interface UserTableProps {
  roles: Role[];
  sizes: Size[];
  sexes: Sex[];
  jobs: Job[];
  unions: Union[];
  users: User[];
}

const UsersTable = ({
  roles,
  sizes,
  sexes,
  jobs,
  unions,
  users,
}: UserTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUsermodalOpen, setIsUsermodalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { isHydrated, getUser } = useAuthStore();
  const userRole = getUser()?.role;

  useEffect(() => {
    handleSort(users[0] ? Object.keys(users[0])[0] : "");
  }, []);

  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue =
      sortColumn === "union"
        ? (a.union?.name ?? "")
        : ((a[sortColumn as keyof User] ?? "") as string);
    const bValue =
      sortColumn === "union"
        ? (b.union?.name ?? "")
        : ((b[sortColumn as keyof User] ?? "") as string);
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const headers = [
    { label: "Voornaam", key: "firstName" },
    { label: "Achternaam", key: "lastName" },
    ...(userRole === "Admin" ? [{ label: "Vereniging", key: "union" }] : []),
    { label: "Maat", key: "tshirt.size" },
    { label: "Geslacht", key: "tshirt.sex" },
    { label: "Functie", key: "tshirt.job" },
    { label: "Bewerk", key: "edit" },
    { label: "Verwijder", key: "delete" },
  ];

  return (
    <div>
      {!isHydrated ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : users.length === 0 ? (
        <p>Geen medewerkers gevonden.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className={"bg-gladiolentext text-white"}>
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="py-2 px-4 border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort(header.key)}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className={"text-center space-y-2"}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                {userRole === "Admin" && (
                  <td>{user.union?.name || "Geen vereniging toegewezen"}</td>
                )}
                <td>{user.tshirt?.size}</td>
                <td>{user.tshirt?.sex}</td>
                <td>{user.tshirt?.job}</td>
                {/*<td>{user.tshirt?.quantity}</td>*/}
                <td className={"flex justify-center items-center"}>
                  <div className="flex justify-center items-center">
                    <PencilIcon
                      className="h-6 w-6 text-green-400"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsUsermodalOpen(true);
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {user.role !== "Admin" ? (
                      <TrashIcon
                        className="h-6 w-6 text-red-500"
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    ) : (
                      <span className="h-6 w-6 inline-block"></span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal isOpen={isDeleteModalOpen}>
        <Confirmdeletemodal
          onClose={() => setIsDeleteModalOpen(false)}
          id={selectedUserId}
          removeFunction={useUserStore((state) => state.removeUser)}
          label="gebruiker"
          link={`http://localhost:8080/admin/user/${selectedUserId}`}
          options={{ method: "DELETE" }}
        />
      </Modal>
      <Modal isOpen={isUsermodalOpen}>
        <Usermodal
          onClose={() => setIsUsermodalOpen(false)}
          unions={unions}
          sizes={sizes}
          jobs={jobs}
          sexes={sexes}
          roles={roles}
          userId={selectedUserId}
        />
      </Modal>
    </div>
  );
};

export default UsersTable;
