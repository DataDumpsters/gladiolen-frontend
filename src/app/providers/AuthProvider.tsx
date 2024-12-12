"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isHydrated, setToken } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if "auth-storage" exists in localStorage
    const storedToken = localStorage.getItem("auth-storage");
    if (!storedToken) {
      // Set a valid default JWT token if it doesn't exist
      const defaultToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      localStorage.setItem("auth-storage", defaultToken);
      setToken(defaultToken);
    } else {
      setToken(storedToken);
    }
    setLoading(false);
  }, [setToken]);

  if (loading || !isHydrated) {
    return <div>Loading...</div>; // Render loading until state is hydrated
  }

  return <>{children}</>;
};
