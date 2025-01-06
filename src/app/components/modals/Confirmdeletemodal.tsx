import React from "react";
import Button from "@/app/components/Button";
import fetchWithAuth from "@/app/utils/fetchWithAuth";

interface ConfirmdeletemodalProps {
  onClose: () => void;
  id: number;
  removeFunction: (id: number) => void;
  label: string;
  link: string;
  options?: RequestInit;
}

const Confirmdeletemodal = ({
  onClose,
  id,
  removeFunction,
  label,
  link,
  options = {},
}: ConfirmdeletemodalProps) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetchWithAuth(link, options);
      if (response.ok) {
        removeFunction(id);
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
      <p className="mb-4">Weet je zeker dat je deze {label} wil verwijderen?</p>
      <div className="flex justify-center">
        <Button
          className="bg-gladiolentext text-white mr-1"
          onClick={() => handleDelete(id)}>
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
