"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Usermodal from "@/app/components/modals/Usermodal";
import Button from "@/app/components/Button";
import useFetchData from "@/app/hooks/useFetchData";
import UsersTable from "@/app/components/UsersTable";

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
        users={users}
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
