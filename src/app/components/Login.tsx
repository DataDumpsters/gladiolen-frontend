"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";
import Forgotpasswordmodal from "@/app/components/modals/Forgotpasswordmodal";
import Modal from "@/app/components/Modal";
import TokenOTPmodal from "@/app/components/modals/TokenOTPmodal";
import Inputfield from "@/app/components/Inputfield";
import Image from "next/image";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: emailId,
          password: password,
        }),
      });
      if (response.ok) {
        setOtpModalOpen(true);
      } else {
        const errorMessage = await response.text();
        setMessage(
          `Uw gegevens kloppen niet of u hebt geen toegang met uw account ${errorMessage}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An error has occured: ${error.message}`);
      } else {
        setMessage(`An unexpected error occured`);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-12 bg-white text-gladiolentext shadow-md rounded-xl">
        <Image
          src="/images/LogoBig.svg"
          alt="GladiolenFestival"
          width={250}
          height={100}
          className={"mx-auto mb-4"}
        />
        <h1 className="text-3xl font-bold mb-4">
          Welkom bij GladiolenRegister!
        </h1>
        <Inputfield
          name={"inputemail"}
          placeholder={"Email"}
          value={emailId}
          setValue={setEmailId}
          className="mb-4"
        />
        <Inputfield
          name={"password"}
          placeholder={"Wachtwoord"}
          type={"password"}
          value={password}
          setValue={setPassword}
        />
        <Link
          href={"#"}
          onClick={() => setIsModalOpen(true)}
          className="text-right mb-4">
          Paswoord vergeten?
        </Link>
        <Modal isOpen={isModalOpen}>
          <Forgotpasswordmodal onClose={() => setIsModalOpen(false)} />
        </Modal>
        <Button className="bg-gladiolentext text-white hover:scale-105">
          Login
        </Button>
      </form>
      <Modal isOpen={otpModalOpen}>
        <TokenOTPmodal onClose={() => setOtpModalOpen(false)} email={emailId} />
      </Modal>
      {message && (
        <div className="flex bg-white text-gladiolentext mt-2 text-2xl rounded-2xl justify-center p-5">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
