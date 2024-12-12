import React from "react";
import Button from "@/app/components/Button";
import { useAuthStore } from "@/app/store/authStore";
import { useUserStore } from "@/app/store/userStore";

interface ConfirmdeletemodalProps {
  onClose: () => void;
  userId: number;
}

const Confirmdeletemodal = ({ onClose, userId }: ConfirmdeletemodalProps) => {
  const token = useAuthStore((state) => state.token);
  const removeUser = useUserStore((state) => state.removeUser);

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
        removeUser(id);
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`An error has occured: ${error.message}`);
      } else {
        console.error(`An unexpected error occured`);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Bevestig verwijdering</h2>
      <p className="mb-4">
        Weet je zeker dat je deze gebruiker wil verwijderen?
      </p>
      <div className="flex justify-center">
        <Button
          className="bg-gladiolentext text-white mr-1"
          onClick={() => handleDelete(userId)}>
          Bevestigen
        </Button>
        <Button className="bg-red-500 text-white" onClick={onClose}>
          Annuleren
        </Button>
      </div>
    </div>
  );
};

export default Confirmdeletemodal;
