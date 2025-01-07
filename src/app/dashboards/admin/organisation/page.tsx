"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Usermodal from "@/app/components/modals/Usermodal";

import useFetchData from "@/app/hooks/useFetchData";
import UsersTable from "@/app/components/UsersTable";
import { useUserStore } from "@/app/stores/userStore";
import { useAuthStore } from "@/app/stores/authStore";
import Inputfield from "@/app/components/Inputfield";
import { useUnionStore } from "@/app/stores/unionStore";

const AdminOrganisationPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { accessToken, isHydrated, getUser } = useAuthStore();
  const { roles, sizes, sexes, jobs, unions } = useFetchData();
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminRole, setAdminRole] = useState(false);
  const { filteredUnion, setFilteredUnion } = useUnionStore();
  const user = getUser();

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
      (!filteredUnion || user.union?.id === filteredUnion.id) &&
      (user.role === "Kernlid" || user.role === "Admin"),
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
      <h1 className="text-white text-4xl my-4">Kernleden</h1>
      {/*<div className="flex-grow mb-2">*/}
      {/*  <Inputfield*/}
      {/*    name={"Userfilter"}*/}
      {/*    placeholder={"Zoek op voornaam of achternaam"}*/}
      {/*    value={searchTerm}*/}
      {/*    setValue={setSearchTerm}*/}
      {/*    className={"flex-grow"}*/}
      {/*  />*/}
      {/*</div>*/}
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

export default AdminOrganisationPage;
