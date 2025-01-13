"use client";

import React, { useEffect, useState, useRef } from "react";
import Modal from "@/app/components/Modal";
import Usermodal from "@/app/components/modals/Usermodal";
import Button from "@/app/components/Button";
import useFetchData from "@/app/hooks/useFetchData";
import UsersTable from "@/app/components/UsersTable";
import { useUserStore } from "@/app/stores/userStore";
import { useAuthStore } from "@/app/stores/authStore";
import Inputfield from "@/app/components/Inputfield";
import { useUnionStore } from "@/app/stores/unionStore";
import fetchWithAuth from "@/app/utils/fetchWithAuth";
import * as XLSX from "xlsx";

const AdminMembersPage = () => {
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
  const [file, setFile] = useState<File | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUsers();
    }
  }, [accessToken, fetchUsers]);

  useEffect(() => {
    if (importSuccess) {
      fetchUsers();
      setImportSuccess(false);
    }
  }, [importSuccess, fetchUsers]);

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

  const importUsersFromExcel = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawUsers = XLSX.utils.sheet_to_json(worksheet);

      const users = rawUsers.map((rawUser: any) => ({
        firstName: rawUser["First Name"],
        lastName: rawUser["Last Name"],
        phoneNumber: rawUser["Phone Number"],
        role: rawUser["Role"],
        email: rawUser["Email"],
        password: rawUser["Password"],
        registryNumber: rawUser["Registry Number"],
        tshirt: {
          size: rawUser["Tshirt Size"],
          sex: rawUser["Tshirt Sex"],
          job: rawUser["Tshirt Job"],
          quantity: rawUser["Tshirt Quantity"],
        },
        active: true,
      }));

      await fetchWithAuth("http://localhost:8080/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });

      console.log("Users imported successfully");
      setImportSuccess(true);
    } catch (error) {
      console.error("Error importing users:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importUsersFromExcel(file);
    }
  };

  const handleImportButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h1 className="text-white text-4xl my-4">Medewerkers</h1>
      <div className={"flex justify-between items-baseline"}>
        <Button
          className="text-white py-2 bg-gladiolentext mb-2"
          onClick={() => setRegisterModalOpen(true)}>
          Medewerker aanmaken
        </Button>
        {user?.role === "Admin" && (
          <label className={"text-white ml-4"}>
            Admin?
            <input
              type="checkbox"
              checked={adminRole}
              onChange={() => setAdminRole(!adminRole)}
              className={"ml-2"}
            />
          </label>
        )}
        {filteredUnion && (
          <Button
            className="text-white py-2 bg-gladiolentext mb-2 ml-2"
            onClick={() => setFilteredUnion(null)}>
            {filteredUnion.name} ({filteredUnion.users?.length}{" "}
            {filteredUnion.users?.length === 1 ? "lid" : "leden"}) - Filter
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
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        className="text-white py-2 bg-gladiolentext mb-2"
        onClick={handleImportButtonClick}>
        Import Users
      </Button>
    </div>
  );
};

export default AdminMembersPage;
