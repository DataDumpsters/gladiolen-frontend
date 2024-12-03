import React, { useEffect, useState } from "react";
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

  const [size, setSize] = useState("");
  const [sex, setSex] = useState("");
  const [job, setJob] = useState("");
  const [quantity, setQuantity] = useState(1);

  const isPasswordValid = (password: string) => {
    return password.length >= 8 && /(?=.*[a-zA-Z])(?=.*\d)/.test(password);
  };
  const passwordsMatch =
    isPasswordValid(password) &&
    isPasswordValid(checkPassword) &&
    password === checkPassword;

  const [roles, setRoles] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sexes, setSexes] = useState<string[]>([]);
  const [jobs, setJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/roles");
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error has occured: ${error.message}`);
        } else {
          console.error(`An unexpected error occured`);
        }
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tshirt/sizes");
        if (response.ok) {
          const data = await response.json();
          setSizes(data);
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error has occured: ${error.message}`);
        } else {
          console.error(`An unexpected error occured`);
        }
      }
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchSexes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tshirt/sexes");
        if (response.ok) {
          const data = await response.json();
          setSexes(data);
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error has occured: ${error.message}`);
        } else {
          console.error(`An unexpected error occured`);
        }
      }
    };
    fetchSexes();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tshirt/jobs");
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error has occured: ${error.message}`);
        } else {
          console.error(`An unexpected error occured`);
        }
      }
    };
    fetchJobs();
  }, []);

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
        if (!value) error = "Wachtwoord is verplicht";
        else if (value.length < 8)
          error = "Wachtwoord moet minimaal 8 karakters bevatten";
        else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value))
          error = "Wachtwoord moet een mix van letters en cijfers bevatten";
        break;
      case "checkPassword":
        if (value !== password) error = "Wachtwoorden komen niet overeen";
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
            tshirt: {
              size,
              sex,
              job,
              quantity,
            },
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
      <h1 className="text-2xl font-bold">Gebruiker aanmaken</h1>
      <p className="text-sm text-gray-500">
        Vul onderstaande velden in om een nieuwe medewerker aan te maken.
      </p>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">Gebruiker Details</h3>
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
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
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
        </div>
        <div className="flex flex-col">
          <select
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              validateField("role", e.target.value);
            }}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
            <option value="">Selecteer een rol</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
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
            placeholder="wachtwoord"
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
            placeholder="voer je wachtwoord nogmaals in"
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
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Tshirt Details</h3>
          <select
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
            <option value="">Selecteer een maat</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <select
            name="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
            <option value="">Selecteer geslacht</option>
            {sexes.map((sex) => (
              <option key={sex} value={sex}>
                {sex}
              </option>
            ))}
          </select>
          <select
            name="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
            <option value="">Selecteer een job</option>
            {jobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
          <div className="flex items-center">
            <label className="mr-2">Vrijdag & zaterdag?</label>
            <input
              type="checkbox"
              name="quantity"
              checked={quantity === 2}
              value={quantity}
              onChange={(e) => setQuantity(e.target.checked ? 2 : 1)}
              className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex justify-start">
          <Button
            className="bg-gladiolentext text-white mr-1"
            type="button"
            onClick={handleUserRegistration}>
            Aanmaken
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
