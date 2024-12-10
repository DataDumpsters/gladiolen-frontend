"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import RegisterUsermodal from "@/app/components/modals/RegisterUsermodal";
import Button from "@/app/components/Button";
import useFetchData from "@/app/hooks/useFetchData";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { useAuthStore } from "@/app/store/authStore";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  registryNumber: string;
  union?: {
    id: number;
    name: string;
  };
  tshirt?: {
    size: string;
    sex: string;
    job: string;
    quantity: number;
  };
}

interface UserTableProps {
  users: User[];
}

const UsersTable = ({ users }: UserTableProps) => {
  const token = useAuthStore((state) => state.token);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log(`User with id ${id} has been deleted`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`An error has occured: ${error.message}`);
      } else {
        console.error(`An unexpected error occured`);
      }
    }
  };

  const handleUpdate = (id: number) => {};

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
                onClick={() => handleDelete(user.id)}
              />
            </td>
            <td>
              <PencilIcon
                className="h-6 w-6"
                onClick={() => handleUpdate(user.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AdminMembersPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { roles, sizes, sexes, jobs, unions, users } = useFetchData();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <Button
        className="text-white py-2 bg-gladiolentext mb-2"
        onClick={() => setRegisterModalOpen(true)}>
        Medewerker aanmaken
      </Button>
      <Modal isOpen={registerModalOpen}>
        <RegisterUsermodal
          onClose={() => setRegisterModalOpen(false)}
          roles={roles}
          sizes={sizes}
          sexes={sexes}
          jobs={jobs}
          unions={unions}
        />
      </Modal>
      <UsersTable users={users} />
    </div>
  );
};

export default AdminMembersPage;
