import React, { useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../providers/context";
import { useAuthStore } from "@/app/store/authStore";

interface TokenOTPmodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  email: string;
}

const TokenOTPmodal = ({ onClose, email }: TokenOTPmodalProps) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter();
  const { basename } = useAppContext();

  const handleTokenSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // Handle token logic here
    // setIsTokenValid(true);
    // router.push(`${basename}`);
    // console.log("Token:", token);
    // Add logic to check if the token is valid
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email,
          oneTimePassword: token,
          context: "LOGIN",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const { setToken, userRole } = useAuthStore.getState();
        setToken(data.accessToken);
        console.log("User Role:", userRole);
        if (userRole === "Admin") {
          router.push(`${basename}`);
        } else {
          setMessage("no admin");
        }
      } else {
        const errorMessage = await response.text();
        setMessage(`Login Failed: ${errorMessage}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An error has occured: ${error.message}`);
      } else {
        setMessage(`An unexpected error occured`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Voer code in</h2>
      <p className="text-sm text-gray-500">
        Voer de code in die je via je email hebt ontvangen om in te loggen.
      </p>
      <p className="text-red-500">{message}</p>
      <input
        type="text"
        placeholder="Code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex justify-start">
          <Button
            className="bg-gladiolentext text-white mr-1"
            type="button"
            onClick={handleTokenSubmit}>
            Invoeren
          </Button>
          <Button
            className="bg-red-500 text-white"
            type="button"
            onClick={onClose}>
            {isTokenValid ? "Close" : "Annuleren"}
          </Button>
        </div>
        {isTokenValid && (
          <div className="flex justify-end text-2xl text-green-400">
            <p>&#x2714; Token valid</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenOTPmodal;
