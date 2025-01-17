"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Inputfield from "@/app/components/Inputfield";
import { useAuthStore } from "@/app/stores/authStore";
import fetchWithAuth from "@/app/utils/fetchWithAuth";
import { useUnionStore } from "@/app/stores/unionStore";

interface UnionmodalProps {
  onClose: () => void;
  unionId?: number;
  onUnionUpdate?: () => void;
}

const Unionmodal = ({ onClose, unionId, onUnionUpdate }: UnionmodalProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [numberOfParkingTickets, setNumberOfParkingTickets] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUnionMade, setIsUnionMade] = useState(false);
  const token = useAuthStore((state) => state.accessToken);
  const fetchUnions = useUnionStore((state) => state.fetchUnions);

  useEffect(() => {
    if (unionId) {
      // Fetch user data when userId is provided
      const fetchUnionData = async () => {
        try {
          const response = await fetchWithAuth(
            `http://localhost:8080/api/union/${unionId}`,
          );
          if (response.ok) {
            const union = await response.json();
            setName(union.name);
            setAddress(union.address);
            setPostalCode(union.postalCode);
            setMunicipality(union.municipality);
            setVatNumber(union.vatNumber);
            setAccountNumber(union.accountNumber);
            setNumberOfParkingTickets(union.numberOfParkingTickets); // Clear password fields for security
            console.log("Union data fetched: ", union);
          } else {
            console.error("Failed to fetch union data: ", response.statusText);
          }
        } catch (error) {
          console.error("Failed to fetch union data", error);
        }
      };

      fetchUnionData();
    }
  }, [unionId, token]);

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Naam is verplicht";
        else if (value.length < 2)
          error = "Voornaam moet minimaal 2 karakters bevatten";
        break;
      case "address":
        if (!value) error = "Adres is verplicht";
        else if (value.length < 2)
          error = "Achternaam moet minimaal 2 karakters bevatten";
        break;
      case "postalCode":
        if (!value) error = "Postcode is verplicht";
        else if (value.length != 4)
          error = "Achternaam moet 4 karakters bevatten";
        break;
      case "municipality":
        if (!value) error = "Gemeente is verplicht";
        else if (value.length < 2)
          error = "Achternaam moet 4 karakters bevatten";
        break;
      case "vatNumber":
        const vatRegex = /^BE\d{10}$/;
        if (!value) {
          error = "BTW nummer is verplicht";
        } else if (!vatRegex.test(value)) {
          error = "BTW nummer moet beginnen met 'BE' gevolgd door 10 cijfers";
        }
        break;
      case "accountNumber":
        const accRegex = /^BE\d{14}$/;
        if (!value) {
          error = "Rekeningnummer is verplicht";
        } else if (!accRegex.test(value)) {
          error =
            "Rekeningnummer moet beginnen met 'BE' gevolgd door 10 cijfers";
        }
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // const checkUnionExists = async (email: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/user/check-email?email=${email}`,
  //     );
  //     if (response.ok) {
  //       const exists = await response.json();
  //       if (exists) {
  //         setErrors((prevErrors) => ({
  //           ...prevErrors,
  //           email: "Er bestaat reeds een gebruiker met dit emailadres",
  //         }));
  //       } else {
  //         setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to check email", error);
  //   }
  // };

  const handleUnion = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = Object.keys(errors).reduce(
      (acc, key) => {
        if (errors[key]) acc[key] = errors[key];
        return acc;
      },
      {} as { [key: string]: string },
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const registerUnion = async () => {
      console.log("Union Id before payload:", unionId);
      const payload = {
        name,
        address,
        postalCode,
        municipality,
        vatNumber,
        accountNumber,
        numberOfParkingTickets,
      };

      console.log("Union ID:", unionId); // Log the value of unionId
      console.log("Payload:", payload);
      try {
        const url = unionId
          ? `http://localhost:8080/api/union/${unionId}`
          : `http://localhost:8080/api/union`;
        const method = unionId ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setIsUnionMade(true);
          await fetchUnions();
          if (onUnionUpdate) {
            onUnionUpdate(); // Call the update handler if provided
          }
          onClose();
        } else {
          const errorMessage = await response.text();
          console.error(
            `Registration Failed: ${errorMessage || response.statusText}`,
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error has occured: ${error.message}`);
        } else {
          console.error(`An unexpected error occured`);
        }
      }
    };
    registerUnion();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        {unionId ? "Vereniging bewerken" : "Vereniging aanmaken"}
      </h1>
      <p className="text-sm text-gray-500">
        {unionId
          ? "Vul onderstaande velden in om de vereniging te bewerken."
          : "Vul onderstaande velden in om een nieuwe vereniging aan te maken."}
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Vereniging</h3>
        <div className="flex flex-col gap-2">
          <Inputfield
            name={"name"}
            placeholder={"naam"}
            label={"Naam"}
            value={name}
            setValue={setName}
            validateField={validateField}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <Inputfield
            name={"address"}
            placeholder={"adres"}
            label={"Adres"}
            value={address}
            setValue={setAddress}
            validateField={validateField}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
          <Inputfield
            name={"postalCode"}
            placeholder={"postcode"}
            label={"PostCode"}
            value={postalCode}
            setValue={setPostalCode}
            validateField={validateField}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode}</p>
          )}
          <Inputfield
            name={"municipality"}
            placeholder={"gemeente"}
            label={"Gemeente"}
            value={municipality}
            setValue={setMunicipality}
            validateField={validateField}
          />
          {errors.municipality && (
            <p className="text-red-500">{errors.municipality}</p>
          )}
          <Inputfield
            name={"vatNumber"}
            placeholder={"BTW-nummer"}
            label={"BTW-nummer"}
            value={vatNumber}
            setValue={setVatNumber}
            validateField={validateField}
          />
          {errors.vatNumber && (
            <p className="text-red-500">{errors.vatNumber}</p>
          )}
          <Inputfield
            name={"accountNumber"}
            placeholder={"rekeningnummer"}
            label={"Rekeningnummer"}
            value={accountNumber}
            setValue={setAccountNumber}
            validateField={validateField}
          />
          {errors.accountNumber && (
            <p className="text-red-500">{errors.accountNumber}</p>
          )}
          <div className="relative rounded-xl border border-solid border-gray-300 p-2">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Aantal parkeertickets
            </label>
            <input
              name={"numberOfParkingTickets"}
              placeholder={"aantal parkeertickets"}
              value={numberOfParkingTickets}
              onChange={(e) =>
                setNumberOfParkingTickets(parseInt(e.target.value))
              }
              type={"number"}
              className={"flex w-full"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex justify-start">
          <Button
            className="bg-gladiolentext text-white mr-1"
            type="button"
            onClick={handleUnion}>
            {unionId ? "Bewerken" : "Aanmaken"}
          </Button>
          <Button
            className="bg-red-500 text-white"
            type="button"
            onClick={onClose}>
            Annuleren
          </Button>
        </div>
        {isUnionMade && (
          <div className="flex justify-end text-2xl text-green-400">
            {unionId ? (
              <p>&#x2714; Vereniging bewerkt</p>
            ) : (
              <p>&#x2714; Vereniging aangemaakt</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Unionmodal;
