import React, { useState } from "react";
import Button from "@/app/components/Button";

interface RegisterUsermodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RegisterUsermodal = ({ onClose }: RegisterUsermodalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [registryNumber, setRegistryNumber] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isPasswordValid = (password: string) => {
    return password.length >= 8 && /(?=.*[a-zA-Z])(?=.*\d)/.test(password);
  };

  const passwordsMatch =
    isPasswordValid(password) &&
    isPasswordValid(checkPassword) &&
    password === checkPassword;

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value) error = "Voornaam is verplicht";
        else if (value.length < 2)
          error = "Voornaam moet minimaal 2 karakters bevatten";
        break;
      case "lastName":
        if (!value) error = "Achternaam is verplicht";
        else if (value.length < 2)
          error = "Achternaam moet minimaal 2 karakters bevatten";
        break;
      case "email":
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          error = "Ongeldig emailadres";
        break;
      case "role":
        if (!value) error = "Rol is verplicht";
        break;
      case "registryNumber":
        if (!value) error = "Registernummer is verplicht";
        break;
      case "password":
        if (!value) error = "Paswoord is verplicht";
        else if (value.length < 8)
          error = "Paswoord moet minimaal 8 karakters bevatten";
        else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value))
          error = "Paswoord moet een mix van letters en cijfers bevatten";
        break;
      case "checkPassword":
        if (value !== password) error = "Paswoorden komen niet overeen";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleUserRegistration = (e: React.FormEvent) => {
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
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phoneNumber,
            email,
            role,
            registryNumber,
            password,
          }),
        });
        if (response.ok) {
          console.log("User registered successfully");
        } else {
          const errorMessage = await response.text();
          console.error(`Registration Failed: ${errorMessage}`);
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
      <h2 className="text-2xl font-bold">Registreer</h2>
      <p className="text-sm text-gray-500">
        Vul onderstaande velden in om een nieuwe account aan te maken.
      </p>
      <input
        type="text"
        name="firstName"
        placeholder="voornaam"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          validateField("firstName", e.target.value);
        }}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      <input
        type="text"
        name="lastName"
        placeholder="achternaam"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          validateField("lastName", e.target.value);
        }}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      <input
        type="text"
        name="phoneNumber"
        placeholder="telefoonnummer"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      {errors.phoneNumber && (
        <p className="text-red-500">{errors.phoneNumber}</p>
      )}
      <input
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateField("email", e.target.value);
        }}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <input
        type="text"
        name="role"
        placeholder="rol"
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          validateField("role", e.target.value);
        }}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      {errors.role && <p className="text-red-500">{errors.role}</p>}
      <input
        type="text"
        name="registryNumber"
        placeholder="registernummer"
        value={registryNumber}
        onChange={(e) => {
          setRegistryNumber(e.target.value);
          validateField("registryNumber", e.target.value);
        }}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      {errors.registryNumber && (
        <p className="text-red-500">{errors.registryNumber}</p>
      )}
      <input
        type="password"
        name="password"
        placeholder="paswoord"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validateField("password", e.target.value);
        }}
        className={`rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5 ${passwordsMatch ? "shadow-md shadow-green-500" : ""}`}
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      <input
        type="password"
        name="checkPassword"
        placeholder="voer je paswoord nogmaals in"
        value={checkPassword}
        onChange={(e) => {
          setCheckPassword(e.target.value);
          validateField("checkPassword", e.target.value);
        }}
        className={`rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5 ${passwordsMatch ? "shadow-md shadow-green-500" : ""}`}
      />
      {errors.checkPassword && (
        <p className="text-red-500">{errors.checkPassword}</p>
      )}
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex justify-start">
          <Button
            className="bg-gladiolentext text-white mr-1"
            type="button"
            onClick={handleUserRegistration}>
            Registreer
          </Button>
          <Button
            className="bg-red-500 text-white"
            type="button"
            onClick={onClose}>
            Annuleren
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUsermodal;
