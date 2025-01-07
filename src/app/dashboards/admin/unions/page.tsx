"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { useAuthStore } from "@/app/stores/authStore";
import Inputfield from "@/app/components/Inputfield";
import Unionmodal from "@/app/components/modals/Unionmodal";
import UnionsTable from "@/app/components/UnionsTable";
import { useUnionStore } from "@/app/stores/unionStore";

const AdminUnionsPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { accessToken, isHydrated } = useAuthStore();
  const unions = useUnionStore((state) => state.unions);
  const fetchUnions = useUnionStore((state) => state.fetchUnions);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUnions();
    }
  }, [accessToken, fetchUnions]);

  const filteredUnions = unions.filter((union: Union) =>
    union.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
      <h1 className="text-white text-4xl my-4">Verenigingen</h1>
      <div className={"flex justify-between items-baseline"}>
        <Button
          className="text-white py-2 bg-gladiolentext mb-2"
          onClick={() => setRegisterModalOpen(true)}>
          Vereniging aanmaken
        </Button>
        <div className="flex-grow ml-4">
          <Inputfield
            name={"Unionfilter"}
            placeholder={"Zoek op voornaam of achternaam"}
            value={searchTerm}
            setValue={setSearchTerm}
            className={"flex-grow"}
          />
        </div>
      </div>
      <Modal isOpen={registerModalOpen}>
        <Unionmodal onClose={() => setRegisterModalOpen(false)} />
      </Modal>
      <UnionsTable unions={filteredUnions} />
    </div>
  );
};

export default AdminUnionsPage;
