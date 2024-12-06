import React, { useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface TokenOTPmodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TokenOTPmodal = ({ onClose }: TokenOTPmodalProps) => {
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter();

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle token logic here
    setIsTokenValid(true);
    router.push("/dashboards/admin");
    console.log("Token:", token);
    // Add logic to check if the token is valid
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Voer code in</h2>
      <p className="text-sm text-gray-500">
        Voer de code in die je via je email hebt ontvangen om in te loggen.
      </p>
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
