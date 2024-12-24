"use client";

import React from "react";
import Link from "next/link";
import { useAppContext } from "@/app/providers/context";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useLinkStore } from "@/app/store/linkStore"; // Import the Zustand store

const SideNav = () => {
  const { basename } = useAppContext(); // Access basename from context
  const { activeRoute, setActiveRoute } = useLinkStore() as {
    activeRoute: string;
    setActiveRoute: (route: string) => void;
  }; // Get active route and the setter function from Zustand store

  return (
    <nav className="fixed top-0 left-0 flex flex-col items-center bg-white text-gladiolentext text-xl w-64 h-full">
      <div className="mb-8">
        <Image
          src={"/images/LogoBig.svg"}
          alt="GladiolenFestival"
          width={250}
          height={250}
        />
      </div>

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

      <Link
        href={`${basename}/statistics`}
        onClick={() => setActiveRoute(`${basename}/statistics`)} // Set active route when the link is clicked
        className={`w-full text-center px-4 py-2 rounded-xl rounded-r-none ml-4 ${
          activeRoute === `${basename}/statistics`
            ? "bg-gladiolenbg text-white"
            : "hover:bg-gladiolenbg hover:text-white"
        }`}>
        <Button className="w-full">Statistieken</Button>
      </Link>
    </nav>
  );
};

export default SideNav;
