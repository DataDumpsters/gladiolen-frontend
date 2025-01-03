"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import SecureLS from "secure-ls";
import { jwtDecode } from "jwt-decode";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  isTokenExpired: () => boolean;
  refreshAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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
      isTokenExpired: () => {
        const { accessToken } = get();
        if (!accessToken) return true;
        try {
          const decoded: { exp: number } = jwtDecode(accessToken);
          return decoded.exp * 1000 < Date.now();
        } catch (error) {
          return true;
        }
      },
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return null;
        try {
          const response = await fetch("http://localhost:8080/refresh-token", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refreshToken }),
          });
          if (response.ok) {
            const data = await response.json();
            set({ accessToken: data.accessToken });
            return data.accessToken;
          } else {
            return null;
          }
        } catch (error) {
          return null;
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
