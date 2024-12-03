"use client";

import React, { useState, useEffect } from "react";
import Login from "./components/Login";

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8 sm:p-20">
      <Login />
    </div>
  );
};

export default Page;
