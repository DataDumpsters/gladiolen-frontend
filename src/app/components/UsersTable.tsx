import { useAuthStore } from "@/app/store/authStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import Confirmdeletemodal from "@/app/components/modals/Confirmdeletemodal";
import Usermodal from "@/app/components/modals/Usermodal";

interface UserTableProps {
  users: User[];
  roles: Role[];
  sizes: Size[];
  sexes: Sex[];
  jobs: Job[];
  unions: Union[];
}

const UsersTable = ({
  users,
  roles,
  sizes,
  sexes,
  jobs,
  unions,
}: UserTableProps) => {
  const token = useAuthStore((state) => state.token);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUsermodalOpen, setIsUsermodalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  if (users.length === 0) {
    return <p>No members available.</p>;
  }

  // Define the headers you want to include
  const headers = [
    "Voornaam",
    "Achternaam",
    "Vereniging",
    "Maat",
    "Geslacht",
    "Functie",
    "Aantal",
    "Bewerk",
    "Verwijder",
  ];

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="py-2 px-4 border-b border-gray-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.union?.name || "Geen vereniging toegewezen"}</td>
              <td>{user.tshirt?.size}</td>
              <td>{user.tshirt?.sex}</td>
              <td>{user.tshirt?.job}</td>
              <td>{user.tshirt?.quantity}</td>
              <td>
                <TrashIcon
                  className="h-6 w-6"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setIsDeleteModalOpen(true);
                  }}
                />
              </td>
              <td>
                <PencilIcon
                  className="h-6 w-6"
                  onClick={() => setIsUsermodalOpen(true)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isDeleteModalOpen}>
        <Confirmdeletemodal
          onClose={() => setIsDeleteModalOpen(false)}
          userId={selectedUserId}
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
