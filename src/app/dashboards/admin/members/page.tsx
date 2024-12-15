"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Usermodal from "@/app/components/modals/Usermodal";
import Button from "@/app/components/Button";
import useFetchData from "@/app/hooks/useFetchData";
import UsersTable from "@/app/components/UsersTable";
import { useUserStore } from "@/app/store/userStore";
import { useAuthStore } from "@/app/store/authStore";
import Inputfield from "@/app/components/Inputfield";

const AdminMembersPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { token, isHydrated } = useAuthStore();
  const { roles, sizes, sexes, jobs, unions } = useFetchData();
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminRole, setAdminRole] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (token) {
      fetchUsers(token);
    }
  }, [token, fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedUsers = adminRole
    ? filteredUsers.filter((user) => user.role === "Admin")
    : filteredUsers;

  if (!isClient) {
    return null;
  }

  if (!isHydrated) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return (
    <div>
      <div className={"flex justify-between items-baseline"}>
        <Button
          className="text-white py-2 bg-gladiolentext mb-2"
          onClick={() => setRegisterModalOpen(true)}>
          Medewerker aanmaken
        </Button>
        <label className={"text-white"}>
          Admin?
          <input
            type="checkbox"
            checked={adminRole}
            onChange={() => setAdminRole(!adminRole)}
            className={"ml-2"}
          />
        </label>
        <Inputfield
          name={"Userfilter"}
          placeholder={"Zoek op voornaam of achternaam"}
          value={searchTerm}
          setValue={setSearchTerm}
          className={"w-1/2"}
        />
      </div>
      <Modal isOpen={registerModalOpen}>
        <Usermodal
          onClose={() => setRegisterModalOpen(false)}
          roles={roles}
          sizes={sizes}
          sexes={sexes}
          jobs={jobs}
          unions={unions}
        />
      </Modal>
      <UsersTable
        users={displayedUsers}
        sexes={sexes}
        jobs={jobs}
        sizes={sizes}
        roles={roles}
        unions={unions}
      />
    </div>
  );
};

export default AdminMembersPage;
