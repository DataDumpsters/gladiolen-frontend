import React, { useState } from "react";
import Button from "../Button";

interface ForgotpasswordmodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Forgotpasswordmodal = ({ onClose }: ForgotpasswordmodalProps) => {
  const [email, setEmail] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    setIsMailSent(true);
    console.log("Email:", email);
    // Add logic to check if the user has this email and send reset link
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <p className="text-sm text-gray-500">
        Paswoord vergeten? Geen probleem! Vul je email in en we sturen je een
        link om je paswoord te resetten.
      </p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
      />
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex justify-start">
          <Button
            className="bg-gladiolentext text-white mr-1"
            type="button"
            onClick={handleForgotPassword}>
            Send Reset Link
          </Button>
          <Button
            className="bg-red-500 text-white"
            type="button"
            onClick={onClose}>
            {isMailSent ? "Sluiten" : "Annuleren"}
          </Button>
        </div>
        {isMailSent && (
          <div className="flex justify-end text-2xl text-green-400">
            <p>&#x2714; Mail verzonden</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forgotpasswordmodal;
