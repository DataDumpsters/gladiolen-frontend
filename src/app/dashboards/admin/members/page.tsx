"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import RegisterUsermodal from "@/app/components/modals/RegisterUsermodal";
import Link from "next/link";
import Button from "@/app/components/Button";
import useFetchData from "@/app/hooks/useFetchData";

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
  if (users.length === 0) {
    return <p>No members available.</p>;
  }

  const headers = Object.keys(users[0]);

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
            {headers.map((header) => {
              let cellValue: React.ReactNode = "N/A"; // Default value if none of the conditions match

              if (header === "union" && user.union) {
                // If the header is 'union' and user has a union object
                cellValue = user.union.name ?? "N/A";
              } else if (header === "tshirt" && user.tshirt) {
                // If the header is 'tshirt' and user has a tshirt object
                cellValue = `Size: ${user.tshirt.size}, Sex: ${user.tshirt.sex}, Job: ${user.tshirt.job}, Quantity: ${user.tshirt.quantity}`;
              } else {
                // Otherwise, we fall back to the default header value or user data
                const value = user[header as keyof User];
                cellValue = value
                  ? typeof value === "object"
                    ? JSON.stringify(value) // Convert complex objects to strings
                    : value
                  : "N/A"; // Default if the value is undefined or null
              }

              return (
                <td key={header} className="py-2 px-4 border-b border-gray-200">
                  {cellValue}
                </td>
              );
            })}
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
      <div>
        <h1>Members Page</h1>
        <p>Welcome to the members page.</p>
      </div>
      <Button className="text-white py-2">
        <Link href="#" onClick={() => setRegisterModalOpen(true)}>
          <span className="font-bold underline">Medewerker aanmaken</span>.
        </Link>
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
