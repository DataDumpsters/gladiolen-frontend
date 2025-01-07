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
import { useLinkStore } from "@/app/stores/linkStore";
import { User } from "@/app/models/User";
import Unionmodal from "@/app/components/modals/Unionmodal";

const UnionMembersPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { accessToken, isHydrated, getUser, fetchUser } = useAuthStore();
  const { roles, sizes, sexes, jobs, unions } = useFetchData();
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User | null>(getUser());
  const { setActiveRoute } = useLinkStore() as {
    setActiveRoute: (route: string) => void;
  }; // Get active route and the setter function from Zustand store
  const [isUnionmodalOpen, setIsUnionmodalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setActiveRoute("dashboards/hoofdverantwoordelijke/vereniging");
    console.log("user", user);
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUsers();
    }
  }, [accessToken, fetchUsers]);

  const handleUnionUpdate = async () => {
    await fetchUser(); // Refetch user data
    setUser(getUser()); // Update the state with the new user data
  };

  const filteredUsers = users.filter(
    (user) =>
      user.union?.id === getUser()?.union?.id &&
      (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())),
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
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl my-4">Vereniging</h1>
        <Button
          className="text-white py-2 bg-gladiolentext mb-2 ml-2"
          onClick={() => {
            setIsUnionmodalOpen(true);
          }}>
          Vereniging bewerken
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">Naam</h2>
          <p className="text-white text-xl">{user?.union?.name}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">Adres</h2>
          <p className="text-white text-xl">{user?.union?.address}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">Postcode</h2>
          <p className="text-white text-xl">{user?.union?.postalCode}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">Gemeente</h2>
          <p className="text-white text-xl">{user?.union?.municipality}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">BTW-nummer</h2>
          <p className="text-white text-xl">{user?.union?.vatNumber}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">Rekeningnummer</h2>
          <p className="text-white text-xl">{user?.union?.accountNumber}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl my-2">Aantal parkeertickets</h2>
          <p className="text-white text-xl">
            {user?.union?.numberOfParkingTickets}
          </p>
        </div>

        <Modal isOpen={isUnionmodalOpen}>
          <Unionmodal
            onClose={() => setIsUnionmodalOpen(false)}
            unionId={user?.union?.id}
            onUnionUpdate={handleUnionUpdate}
          />
        </Modal>
      </div>
      <h1 className="text-white text-4xl my-4">Medewerkers</h1>
      <div className={"flex justify-between items-baseline"}>
        <Button
          className="text-white py-2 bg-gladiolentext mb-2"
          onClick={() => setRegisterModalOpen(true)}>
          Medewerker aanmaken
        </Button>
        {!isUnionmodalOpen && (
          <div className="flex-grow ml-4">
            <Inputfield
              name={"Userfilter"}
              placeholder={"Zoek op voornaam of achternaam"}
              value={searchTerm}
              setValue={setSearchTerm}
              className={"flex-grow"}
            />
          </div>
        )}
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
        users={filteredUsers}
        sexes={sexes}
        jobs={jobs}
        sizes={sizes}
        roles={roles}
        unions={unions}
      />
    </div>
  );
};

export default UnionMembersPage;
