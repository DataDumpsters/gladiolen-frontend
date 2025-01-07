"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Usermodal from "@/app/components/modals/Usermodal";
import Button from "@/app/components/Button";
import useFetchData from "@/app/hooks/useFetchData";
import UsersTable from "@/app/components/UsersTable";
import { useUserStore } from "@/app/stores/userStore";
import { useAuthStore } from "@/app/stores/authStore";
import Inputfield from "@/app/components/Inputfield";
import { useUnionStore } from "@/app/stores/unionStore";

const AdminMembersPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { accessToken, isHydrated } = useAuthStore();
  const { roles, sizes, sexes, jobs, unions } = useFetchData();
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminRole, setAdminRole] = useState(false);
  const { filteredUnion, setFilteredUnion } = useUnionStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUsers();
    }
  }, [accessToken, fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filteredUnion || user.union?.id === filteredUnion.id),
  );

  const displayedUsers = adminRole
    ? filteredUsers.filter((user) => user.role === "Admin")
    : filteredUsers;

  if (!isClient) {
    return null;
  }

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className={"flex justify-between items-baseline"}>
        <Button
          className="text-white py-2 bg-gladiolentext mb-2"
          onClick={() => setRegisterModalOpen(true)}>
          Medewerker aanmaken
        </Button>
        <label className={"text-white ml-4"}>
          Admin?
          <input
            type="checkbox"
            checked={adminRole}
            onChange={() => setAdminRole(!adminRole)}
            className={"ml-2"}
          />
        </label>
        {filteredUnion && (
          <Button
            className="text-white py-2 bg-gladiolentext mb-2 ml-2"
            onClick={() => setFilteredUnion(null)}>
            {filteredUnion.name} ({filteredUnion.users?.length}) leden - Filter
            wissen
          </Button>
        )}
        <div className="flex-grow ml-4">
          <Inputfield
            name={"Userfilter"}
            placeholder={"Zoek op voornaam of achternaam"}
            value={searchTerm}
            setValue={setSearchTerm}
            className={"flex-grow"}
          />
        </div>
      </div>
      <Modal isOpen={registerModalOpen} width={"w-1/2"}>
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
