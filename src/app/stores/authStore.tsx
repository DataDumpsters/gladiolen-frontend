"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import SecureLS from "secure-ls";
import { jwtDecode } from "jwt-decode";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { User } from "@/app/models/User";

let ls: SecureLS | null = null;

if (typeof window !== "undefined") {
  ls = new SecureLS({ encodingType: "aes" });
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setToken: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  isTokenExpired: () => boolean;
  refreshAccessToken: () => Promise<string | null>;
  getUser: () => User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isHydrated: false,
      setToken: async (accessToken: string, refreshToken: string) => {
        if (!accessToken || !refreshToken) return;
        try {
          const decoded: { user_id: number } = jwtDecode(accessToken);
          console.log("Decoded user ID:", decoded.user_id);

          // Fetch the complete user object from the backend
          const response = await fetch(
            `http://localhost:8080/user/${decoded.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (response.ok) {
            const user: User = await response.json();
            console.log("Fetched user:", user);
            set({
              accessToken,
              refreshToken,
              user,
              isHydrated: true,
            });
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error(
            "Error decoding token or fetching user details:",
            error,
          );
        }
      },
      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isHydrated: false,
        });
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
      getUser: () => {
        const { user } = get();
        return user;
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
