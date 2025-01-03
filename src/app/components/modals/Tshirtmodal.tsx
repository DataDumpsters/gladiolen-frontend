"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Inputfield from "@/app/components/Inputfield";
import { useAuthStore } from "@/app/store/authStore";
import { useTshirtStore } from "@/app/store/tshirtStore";
import Dropdown from "@/app/components/Dropdown";
import FilteredDropdown from "@/app/components/FilteredDropdown";
import fetchWithAuth from "@/app/utils/fetchWithAuth";

interface TshirtmodalProps {
  onClose: () => void;
  sizes: Size[];
  sexes: Sex[];
  jobs: Job[];
  tshirtId?: number;
}

const Tshirtmodal = ({
  onClose,
  sizes,
  sexes,
  jobs,
  tshirtId,
}: TshirtmodalProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [size, setSize] = useState("");
  const [sex, setSex] = useState("");
  const [job, setJob] = useState("");
  const [isTshirtMade, setIsTshirtMade] = useState(false);
  const token = useAuthStore((state) => state.accessToken);
  const fetchTshirts = useTshirtStore((state) => state.fetchTshirts);

  useEffect(() => {
    if (tshirtId) {
      // Fetch user data when userId is provided
      const fetchTshirtData = async () => {
        try {
          const response = await fetchWithAuth(
            `http://localhost:8080/api/tshirt/${tshirtId}`,
          );
          if (response.ok) {
            const tshirt = await response.json();
            setSize(tshirt.size || "");
            setSex(tshirt.sex || "");
            setJob(tshirt.job || "");
            console.log("tsirt data fetched: ", tshirt);
          } else {
            console.error("Failed to fetch user data: ", response.statusText);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };

      fetchTshirtData();
    }
  }, [tshirtId, token]);
  //
  // const validateField = (name: string, value: string) => {
  //   let error = "";
  //   switch (name) {
  //     case "firstName":
  //       if (!value) error = "Voornaam is verplicht";
  //       else if (value.length < 2)
  //         error = "Voornaam moet minimaal 2 karakters bevatten";
  //       break;
  //     case "lastName":
  //       if (!value) error = "Achternaam is verplicht";
  //       else if (value.length < 2)
  //         error = "Achternaam moet minimaal 2 karakters bevatten";
  //       break;
  //     case "email":
  //       if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
  //         error = "Ongeldig emailadres";
  //       break;
  //     case "role":
  //       if (!value) error = "Rol is verplicht";
  //       break;
  //     case "registryNumber":
  //       if (!value) error = "Registernummer is verplicht";
  //       break;
  //     case "password":
  //       if (!value) error = "Wachtwoord is verplicht";
  //       else if (value.length < 8)
  //         error = "Wachtwoord moet minimaal 8 karakters bevatten";
  //       else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value))
  //         error = "Wachtwoord moet een mix van letters en cijfers bevatten";
  //       break;
  //     case "checkPassword":
  //       if (value !== password) error = "Wachtwoorden komen niet overeen";
  //       break;
  //     default:
  //       break;
  //   }
  //   setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  // };

  const handleTshirt = (e: React.FormEvent) => {
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
    // Handle user registration logic here
    const registerUser = async () => {
      const payload = {
        size,
        sex,
        job,
      };
      console.log("Payload:", payload);
      try {
        const url = tshirtId
          ? `http://localhost:8080/api/tshirt/${tshirtId}`
          : "http://localhost:8080/api/tshirt";
        const method = tshirtId ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setIsTshirtMade(true);
          await fetchTshirts(token);
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
    registerUser();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        {tshirtId ? "Medewerker bewerken" : "Medewerker aanmaken"}
      </h1>
      <p className="text-sm text-gray-500">
        {tshirtId
          ? "Vul onderstaande velden in om de medewerker te bewerken."
          : "Vul onderstaande velden in om een nieuwe gebruiker aan te maken."}
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Medewerker</h3>
        <div className="flex flex-col gap-2">
          {/*  <Dropdown*/}
          {/*    name={"role"}*/}
          {/*    label={"Rol"}*/}
          {/*    title={"rol"}*/}
          {/*    items={roles}*/}
          {/*    value={role}*/}
          {/*    setValue={setRole}*/}
          {/*    validateField={validateField}*/}
          {/*  />*/}
          {/*  {errors.role && <p className="text-red-500">{errors.role}</p>}*/}
          {/*  <Inputfield*/}
          {/*    name={"registryNumber"}*/}
          {/*    placeholder={"rijksregisternummer"}*/}
          {/*    label={"Rijksregisternummer"}*/}
          {/*    value={registryNumber}*/}
          {/*    setValue={setRegistryNumber}*/}
          {/*    validateField={validateField}*/}
          {/*  />*/}
          {/*  {errors.registryNumber && (*/}
          {/*    <p className="text-red-500">{errors.registryNumber}</p>*/}
          {/*  )}*/}
          {/*  <Inputfield*/}
          {/*    name={"password"}*/}
          {/*    placeholder={"wachtwoord"}*/}
          {/*    label={"Wachtwoord"}*/}
          {/*    value={password}*/}
          {/*    setValue={setPassword}*/}
          {/*    validateField={validateField}*/}
          {/*    type={"password"}*/}
          {/*  />*/}
          {/*  {errors.password && <p className="text-red-500">{errors.password}</p>}*/}
          {/*  <Inputfield*/}
          {/*    name={"checkPassword"}*/}
          {/*    placeholder={"check wachtwoord"}*/}
          {/*    label={"Check wachtwoord"}*/}
          {/*    value={checkPassword}*/}
          {/*    setValue={setCheckPassword}*/}
          {/*    validateField={validateField}*/}
          {/*    type={"password"}*/}
          {/*  />*/}
          {/*  {errors.checkPassword && (*/}
          {/*    <p className="text-red-500">{errors.checkPassword}</p>*/}
          {/*  )}*/}
          {/*</div>*/}
          <h3 className="text-xl font-bold">Tshirt</h3>
          <div className="flex flex-col gap-2">
            <Dropdown
              name={"size"}
              label={"Maat"}
              title={"maat"}
              items={sizes}
              value={size}
              setValue={setSize}
            />
            <Dropdown
              name={"sex"}
              label={"Geslacht"}
              title={"geslacht"}
              items={sexes}
              value={sex}
              setValue={setSex}
            />
            <Dropdown
              name={"job"}
              label={"Functie"}
              title={"job"}
              items={jobs}
              value={job}
              setValue={setJob}
            />
          </div>
        </div>
        <div className="flex flex-row items-baseline justify-between">
          <div className="flex justify-start">
            <Button
              className="bg-gladiolentext text-white mr-1"
              type="button"
              onClick={handleTshirt}>
              {tshirtId ? "Bewerken" : "Aanmaken"}
            </Button>
            <Button
              className="bg-red-500 text-white"
              type="button"
              onClick={onClose}>
              Annuleren
            </Button>
          </div>
          {isTshirtMade && (
            <div className="flex justify-end text-2xl text-green-400">
              {tshirtId ? (
                <p>&#x2714; Gebruiker bewerkt</p>
              ) : (
                <p>&#x2714; Gebruiker aangemaakt</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tshirtmodal;
