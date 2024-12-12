import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Inputfield from "@/app/components/Inputfield";
import { useAuthStore } from "@/app/store/authStore";

interface UsermodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  roles: string[];
  sizes: string[];
  sexes: string[];
  jobs: string[];
  unions: Union[];
  userId?: number;
}

const Usermodal = ({
  onClose,
  roles,
  sizes,
  sexes,
  jobs,
  unions,
  userId,
}: UsermodalProps) => {
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
  const [unionId, setUnionId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isUserMade, setIsUserMade] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (userId) {
      // Fetch user data when userId is provided
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (response.ok) {
            const user = await response.json();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhoneNumber(user.phoneNumber);
            setEmail(user.email);
            setRole(user.role);
            setRegistryNumber(user.registryNumber);
            setSize(user.tshirt?.size || "");
            setSex(user.tshirt?.sex || "");
            setJob(user.tshirt?.job || "");
            setUnionId(user.union?.id.toString() || "");
            setQuantity(user.tshirt?.quantity || 1);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };

      fetchUserData();
    }
  }, [userId, token]);

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

  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/check-email?email=${email}`,
      );
      if (response.ok) {
        const exists = await response.json();
        if (exists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Er bestaat reeds een gebruiker met dit emailadres",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        }
      }
    } catch (error) {
      console.error("Failed to check email", error);
    }
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
      const payload = {
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
        union: unions.find((u) => u.id === parseInt(unionId)),
      };

      console.log("Payload:", payload);
      try {
        const response = await fetch("http://localhost:8080/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("User registered successfully");
          setIsUserMade(true);
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
      <h1 className="text-2xl font-bold">Gebruiker aanmaken</h1>
      <p className="text-sm text-gray-500">
        Vul onderstaande velden in om een nieuwe medewerker aan te maken.
      </p>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">Gebruiker Details</h3>
          <Inputfield
            name="firstName"
            placeholder="voornaam"
            value={firstName}
            setValue={setFirstName}
            validateField={validateField}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
          <Inputfield
            name="lastName"
            placeholder="achternaam"
            value={lastName}
            setValue={setLastName}
            validateField={validateField}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          <Inputfield
            name="phoneNumber"
            placeholder="telefoonnummer"
            value={phoneNumber}
            setValue={setPhoneNumber}
            validateField={validateField}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
          <Inputfield
            name="email"
            placeholder="email"
            value={email}
            setValue={setEmail}
            validateField={validateField}
            onBlur={() => checkEmailExists(email)}
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
          <Inputfield
            name={"registryNumber"}
            placeholder={"rijksregisternummer"}
            value={registryNumber}
            setValue={setRegistryNumber}
            validateField={validateField}
          />
          {errors.registryNumber && (
            <p className="text-red-500">{errors.registryNumber}</p>
          )}
          <Inputfield
            name="password"
            placeholder="wachtwoord"
            value={password}
            setValue={setPassword}
            validateField={validateField}
            type={"password"}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <Inputfield
            name="checkPassword"
            placeholder="check wachtwoord"
            value={checkPassword}
            setValue={setCheckPassword}
            validateField={validateField}
            type={"password"}
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
          <select
            name="union"
            value={unionId}
            onChange={(e) => setUnionId(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
            <option value="">Selecteer een vereniging</option>
            {unions.map((union) => (
              <option key={union.id} value={union.id}>
                {union.name}
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
        {isUserMade && (
          <div className="flex justify-end text-2xl text-green-400">
            <p>&#x2714; Gebruiker aangemaakt</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usermodal;
