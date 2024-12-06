"use client";

import React from "react";
import Link from "next/link";
import { useAppContext } from "@/app/providers/context";

const SideNav = () => {
  const { basename } = useAppContext(); // Access basename from context

  return (
    <nav className="fixed top-0 left-0 flex flex-col items-center bg-white text-gladiolentext text-xl w-64 h-full p-4">
      <div className="mb-8">
        <img src="/path-to-your-logo.png" alt="Logo" className="w-32 h-auto" />
      </div>
      <ul className="flex flex-col gap-4">
        <li>
          <Link href={`${basename}/members`}>Medewerkers</Link>
        </li>
        <li>
          <Link href={`${basename}/unions`}>Verenigingen</Link>
        </li>
        <li>
          <Link href={`${basename}/organisation`}>Organisatie</Link>
        </li>
        <li>
          <Link href={`${basename}/statistics`}>Statistieken</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
