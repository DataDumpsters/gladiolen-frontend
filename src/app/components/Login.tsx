"use client";

import React, { useState } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mesasge, setMessage] = useState("");
  // const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Username:", username);
    // console.log("Password:", password);
    // router.push("/dashboards/admin");
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        setMessage("Login succesful!");
        // handle succesfull login
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
    <div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-16 bg-white text-gladiolentext shadow-md rounded-xl">
        <h1 className="text-3xl font-bold mb-4">
          Welkom bij GladiolenRegister!
        </h1>
        <input
          type="text"
          placeholder="Gebruikersnaam"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Paswoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-0"
        />
        <Link href={"/paswoord"} className="text-right mb-4">
          Paswoord vergeten?
        </Link>
        <Button
          type="submit"
          className="bg-gladiolentext text-white hover:scale-105">
          Login
        </Button>
      </form>
      {mesasge && <p>{mesasge}</p>}
      <div className="text-white py-2">
        Nog geen account? Registreer je <Link href={"/register"}>hier.</Link>
      </div>
    </div>
  );
};

export default Login;
