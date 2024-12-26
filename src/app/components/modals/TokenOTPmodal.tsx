import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../providers/context";
import { useAuthStore } from "@/app/store/authStore";
import { jwtDecode } from "jwt-decode";

interface TokenOTPmodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  email: string;
}

const TokenOTPmodal = ({ onClose, email }: TokenOTPmodalProps) => {
  const [token, setTokenInput] = useState("");
  const [message, setMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter();
  const { basename } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Zustand actions
  const setAuthToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTokenSubmit = async (e: React.FormEvent) => {
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

        // Call Zustand's setToken to persist the token
        setAuthToken(data.accessToken, data.refreshToken);
        console.log("Token set successfully:", data.accessToken);
        console.log("Refresh Token set successfully:", data.refreshToken);

        setIsTokenValid(true);

        // Decode the token to extract user role
        const decodedToken = jwtDecode<{ role: string }>(data.accessToken);
        const userRole = decodedToken.role;

        console.log("Decoded User Role:", userRole);

        // Navigate based on the user role
        if (userRole === "Admin") {
          router.push(`${basename}`);
        } else {
          setMessage("No admin privileges");
        }
      } else {
        const errorMessage = await response.text();
        setMessage(`Login Failed: ${errorMessage}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An error has occurred: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred");
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
        onChange={(e) => setTokenInput(e.target.value)}
        ref={inputRef}
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
            Annuleren
          </Button>
        </div>
        {isTokenValid && (
          <div className="flex justify-end text-2xl text-green-400">
            <p>&#x2714;</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenOTPmodal;
