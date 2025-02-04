"use client";

import React from "react";
import Link from "next/link";
import { useAppContext } from "@/app/providers/context";
import Image from "next/image";
import Button from "@/app/components/Button";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useLinkStore } from "@/app/stores/linkStore"; // Import the Zustand store
import { useAuthStore } from "@/app/stores/authStore";

interface SideNavProps {
  className?: string;
}

const SideNav = ({ className }: { className?: string }) => {
  const { basename } = useAppContext(); // Access basename from context
  const { activeRoute, setActiveRoute } = useLinkStore() as {
    activeRoute: string;
    setActiveRoute: (route: string) => void;
  }; // Get active route and the setter function from Zustand store

  const clearTokens = useAuthStore((state) => state.clearTokens);
  const { getUser } = useAuthStore();
  const user = getUser();
  const userRole = user?.role;

  return (
    <nav
      className={`fixed top-0 left-0 flex flex-col items-center bg-white text-gladiolentext text-xl w-64 h-full ${className}`}>
      <div className="mb-8">
        <Image
          src={"/images/LogoBig.svg"}
          alt="GladiolenFestival"
          width={250}
          height={250}
        />
      </div>

      {userRole === "Admin" && (
        <Link
          href={`${basename}/members`}
          onClick={() => setActiveRoute(`${basename}/members`)} // Set active route when the link is clicked
          className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 mb-1 ${
            activeRoute === `${basename}/members`
              ? "bg-gladiolenbg text-white"
              : "hover:bg-gladiolenbg hover:text-white"
          }`}>
          <Button className="w-full">Medewerkers</Button>
        </Link>
      )}

      {userRole === "Admin" && (
        <Link
          href={`${basename}/tshirt`}
          onClick={() => setActiveRoute(`${basename}/tshirt`)} // Set active route when the link is clicked
          className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 mb-1 ${
            activeRoute === `${basename}/tshirt`
              ? "bg-gladiolenbg text-white"
              : "hover:bg-gladiolenbg hover:text-white"
          }`}>
          <Button className="w-full">Tshirts</Button>
        </Link>
      )}

      {userRole === "Admin" ? (
        <Link
          href={`${basename}/unions`}
          onClick={() => setActiveRoute(`${basename}/unions`)} // Set active route when the link is clicked
          className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 mb-1 ${
            activeRoute === `${basename}/unions`
              ? "bg-gladiolenbg text-white"
              : "hover:bg-gladiolenbg hover:text-white"
          }`}>
          <Button className="w-full">Verenigingen</Button>
        </Link>
      ) : (
        <Link
          href={"/dashboards/hoofdverantwoordelijke/vereniging"}
          onClick={() =>
            setActiveRoute("/dashboards/hoofdverantwoordelijke/vereniging")
          } // Set active route when the link is clicked
          className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 mb-1 ${
            activeRoute === "/dashboards/hoofdverantwoordelijke/vereniging"
              ? "bg-gladiolenbg text-white"
              : "hover:bg-gladiolenbg hover:text-white"
          }`}>
          <Button className="w-full">{user?.union?.name}</Button>
        </Link>
      )}

      {userRole === "Admin" && (
        <Link
          href={`${basename}/organisation`}
          onClick={() => setActiveRoute(`${basename}/organisation`)} // Set active route when the link is clicked
          className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 mb-1 ${
            activeRoute === `${basename}/organisation`
              ? "bg-gladiolenbg text-white"
              : "hover:bg-gladiolenbg hover:text-white"
          }`}>
          <Button className="w-full">Organisatie</Button>
        </Link>
      )}

      {userRole === "Admin" && (
        <Link
          href={`${basename}/statistics`}
          onClick={() => setActiveRoute(`${basename}/statistics`)} // Set active route when the link is clicked
          className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 mb-1 ${
            activeRoute === `${basename}/statistics`
              ? "bg-gladiolenbg text-white"
              : "hover:bg-gladiolenbg hover:text-white"
          }`}>
          <Button className="w-full">Statistieken</Button>
        </Link>
      )}

      <Link
        href={"/"}
        onClick={() => clearTokens()} // Delete the token from the store and redirect to the login page
        className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 ${
          activeRoute === "/"
            ? "bg-gladiolenbg text-white"
            : "hover:bg-gladiolenbg hover:text-white"
        }`}>
        <div className="flex justify-center items-center">
          <Button>Logout</Button>
          <ArrowLeftStartOnRectangleIcon className="w-8 h-8" />
        </div>
      </Link>
    </nav>
  );
};

export default SideNav;
