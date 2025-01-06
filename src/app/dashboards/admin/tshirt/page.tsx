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
import { useTshirtStore } from "@/app/stores/tshirtStore";
import useFetchTshirt from "@/app/hooks/useFetchTshirt";
import Tshirtmodal from "@/app/components/modals/Tshirtmodal";
import TshirtsTable from "@/app/components/TshirtsTable";

const AdminTshirtPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { accessToken, isHydrated } = useAuthStore();
  const { jobs, sizes, sexes } = useFetchTshirt();
  const tshirts = useTshirtStore((state) => state.tshirts);
  const fetchTshirts = useTshirtStore((state) => state.fetchTshirts);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminRole, setAdminRole] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchTshirts(accessToken);
    }
  }, [accessToken, fetchTshirts]);
  //
  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  // );
  //
  // const displayedUsers = adminRole
  //   ? filteredUsers.filter((user) => user.role === "Admin")
  //   : filteredUsers;

  if (!isClient) {
    return null;
  }

  if (!isHydrated) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return (
    <div>
      {/*<div className={"flex justify-between items-baseline"}>*/}
      {/*  <Button*/}
      {/*    className="text-white py-2 bg-gladiolentext mb-2"*/}
      {/*    onClick={() => setRegisterModalOpen(true)}>*/}
      {/*    Medewerker aanmaken*/}
      {/*  </Button>*/}
      {/*  <label className={"text-white ml-4"}>*/}
      {/*    Admin?*/}
      {/*    <input*/}
      {/*      type="checkbox"*/}
      {/*      checked={adminRole}*/}
      {/*      onChange={() => setAdminRole(!adminRole)}*/}
      {/*      className={"ml-2"}*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <div className="flex-grow ml-4">*/}
      {/*    <Inputfield*/}
      {/*      name={"Userfilter"}*/}
      {/*      placeholder={"Zoek op voornaam of achternaam"}*/}
      {/*      value={searchTerm}*/}
      {/*      setValue={setSearchTerm}*/}
      {/*      className={"flex-grow"}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Modal isOpen={registerModalOpen}>
        <Tshirtmodal
          onClose={() => setRegisterModalOpen(false)}
          jobs={jobs}
          sizes={sizes}
          sexes={sexes}
        />
      </Modal>
      <TshirtsTable sexes={sexes} jobs={jobs} sizes={sizes} tshirts={tshirts} />
    </div>
  );
};

export default AdminTshirtPage;
