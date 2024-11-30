import React, { useState } from "react";
import Button from "../Button";

interface ForgotpasswordmodalProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Forgotpasswordmodal = ({ isOpen, onClose }: ForgotpasswordmodalProps) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Email:", email);
    // Add logic to check if the user has this email and send reset link
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2">
          &times;
        </button>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-sm text-gray-500">
            Paswoord vergeten? Geen probleem! Vul je email in en we sturen je
            een link om je paswoord te resetten.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
            />
            <div className="flex flex-row justify-end">
              <Button
                className="bg-gladiolentext text-white mr-1"
                type="submit">
                Send Reset Link
              </Button>
              <Button
                className="bg-red-500 text-white"
                type="button"
                onClick={onClose}>
                Annuleren
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpasswordmodal;
