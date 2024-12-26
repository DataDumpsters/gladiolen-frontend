// import React, { useState } from "react";
// import Button from "../Button";
//
// interface ForgotpasswordmodalProps {
//   onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
// }
//
// const Forgotpasswordmodal = ({ onClose }: ForgotpasswordmodalProps) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isMailSent, setIsMailSent] = useState(false);
//   const [message, setMessage] = useState("");
//
//   const handleForgotPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle forgot password logic here
//     // setIsMailSent(true);
//     // console.log("Email:", email);
//     // console.log("Password:", password);
//     // console.log("Confirm Password:", confirmPassword);
//     // Add logic to check if the user has this email and send reset link
//     try {
//       const response = await fetch("http://localhost:8080/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           emailId: email,
//           newPassword: password,
//         }),
//       });
//     } catch (error) {
//       if (error instanceof Error) {
//         setMessage(`An error has occured: ${error.message}`);
//       } else {
//         setMessage(`An unexpected error occured`);
//       }
//     }
//   };
//
//   return (
//     <div className="flex flex-col gap-4">
//       <h2 className="text-2xl font-bold">Forgot Password</h2>
//       <p className="text-sm text-gray-500">
//         Wachtwoord vergeten? Geen probleem! Vul je email in en we sturen je een
//         code om je wachtwoord te resetten.
//       </p>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
//       />
//       <input
//         type="password"
//         placeholder="New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
//       />
//       <input
//         type="password"
//         placeholder="Confirm New Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
//       />
//       <p className="text-red-500">{message}</p>
//       <div className="flex flex-row items-baseline justify-between">
//         <div className="flex justify-start">
//           <Button
//             className="bg-gladiolentext text-white mr-1"
//             type="button"
//             onClick={handleForgotPassword}>
//             Send Reset Link
//           </Button>
//           <Button
//             className="bg-red-500 text-white"
//             type="button"
//             onClick={onClose}>
//             {isMailSent ? "Sluiten" : "Annuleren"}
//           </Button>
//         </div>
//         {isMailSent && (
//           <div className="flex justify-end text-2xl text-green-400">
//             <p>&#x2714; Mail verzonden</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default Forgotpasswordmodal;

"use client";

import React, { useState } from "react";
import Button from "../Button";
import { useAuthStore } from "@/app/store/authStore";

interface ForgotpasswordmodalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Forgotpasswordmodal = ({ onClose }: ForgotpasswordmodalProps) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  // Zustand actions
  const setAuthToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.accessToken);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/request-password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId: email }),
        },
      );
      if (response.ok) {
        setStep(2);
      } else {
        setMessage("Email does not exist");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An error has occurred: ${error.message}`);
      } else {
        setMessage(`An unexpected error occurred`);
      }
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email,
          oneTimePassword: code,
          context: "RESET_PASSWORD",
        }),
      });
      if (response.ok) {
        const data = await response.json();

        // Call Zustand's setToken to persist the token
        setAuthToken(data.accessToken, data.refreshToken);
        console.log("AccessToken set successfully:", data.accessToken);
        console.log("RefreshToken set successfully:", data.refreshToken);
        setStep(3);
      } else {
        setMessage("Invalid code");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An error has occurred: ${error.message}`);
      } else {
        setMessage(`An unexpected error occurred`);
      }
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: password,
        }),
      });
      if (response.ok) {
        setMessage("Password reset successfully");
      } else {
        setMessage("Password reset failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An error has occurred: ${error.message}`);
      } else {
        setMessage(`An unexpected error occurred`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-sm text-gray-500">
            Enter your email address to receive a reset code.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
          />
          <Button
            className="bg-gladiolentext text-white"
            type="button"
            onClick={handleEmailSubmit}>
            Send Reset Code
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold">Enter Reset Code</h2>
          <p className="text-sm text-gray-500">
            Enter the code sent to your email address.
          </p>
          <input
            type="text"
            placeholder="Reset Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
          />
          <Button
            className="bg-gladiolentext text-white"
            type="button"
            onClick={handleCodeSubmit}>
            Verify Code
          </Button>
        </>
      )}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="text-sm text-gray-500">Enter your new password.</p>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
          />
          <Button
            className="bg-gladiolentext text-white"
            type="button"
            onClick={handlePasswordSubmit}>
            Reset Password
          </Button>
        </>
      )}
      <p className="text-red-500">{message}</p>
      <Button className="bg-red-500 text-white" type="button" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};

export default Forgotpasswordmodal;
