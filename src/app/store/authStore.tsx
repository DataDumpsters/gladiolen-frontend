"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import SecureLS from "secure-ls";

let ls: SecureLS | null = null;

if (typeof window !== "undefined") {
  ls = new SecureLS({ encodingType: "aes" });
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setToken: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isHydrated: false,
      setToken: (accessToken: string, refreshToken: string) => {
        if (!accessToken || !refreshToken) return; // Ensure the token is not null or undefined
        set({
          accessToken, // Save the raw token, do not manipulate or stringify
          refreshToken, // Save the raw token, do not manipulate or stringify
          isHydrated: true,
        });
      },
      clearTokens: () => {
        set({ accessToken: null, refreshToken: null, isHydrated: false });
        if (ls) {
          ls.remove("auth-storage");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: (key) => (ls ? ls.get(key) : null),
        setItem: (key, value) => ls?.set(key, value),
        removeItem: (key) => ls?.remove(key),
      })),
    },
  ),
);
