import React, { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";
import Forgotpasswordmodal from "@/app/components/modals/Forgotpasswordmodal";
import Modal from "@/app/components/Modal";
import TokenOTPmodal from "@/app/components/modals/TokenOTPmodal";
import RegisterUsermodal from "@/app/components/modals/RegisterUsermodal";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [roles, setRoles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setIsClient(true);
    // Fetch roles, sizes, sexes, and jobs
    const fetchData = async () => {
      const rolesResponse = await fetch("http://localhost:8080/api/user/roles");
      const sizesResponse = await fetch(
        "http://localhost:8080/api/tshirt/sizes",
      );
      const sexesResponse = await fetch(
        "http://localhost:8080/api/tshirt/sexes",
      );
      const jobsResponse = await fetch("http://localhost:8080/api/tshirt/jobs");

      setRoles(await rolesResponse.json());
      setSizes(await sizesResponse.json());
      setSexes(await sexesResponse.json());
      setJobs(await jobsResponse.json());
    };

    fetchData();
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
          username,
          password,
        }),
      });
      if (response.ok) {
        setOtpModalOpen(true);
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

  if (!isClient) {
    return null;
  }

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
          placeholder="Email"
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
        <TokenOTPmodal onClose={() => setOtpModalOpen(false)} />
      </Modal>
      {message && <p>{message}</p>}
      <div className="text-white py-2">
        Nog geen account? Registreer je{" "}
        <Link href="#" onClick={() => setRegisterModalOpen(true)}>
          <span className="font-bold underline">hier</span>.
        </Link>
      </div>
      <Modal isOpen={registerModalOpen}>
        <RegisterUsermodal
          onClose={() => setRegisterModalOpen(false)}
          roles={roles}
          sizes={sizes}
          sexes={sexes}
          jobs={jobs}
        />
      </Modal>
    </div>
  );
};

export default Login;
