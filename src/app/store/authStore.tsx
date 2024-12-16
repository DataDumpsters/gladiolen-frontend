import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  userRole: string | null;
  isHydrated: boolean;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userRole: null,
      isHydrated: false,
      setToken: (token: string) => {
        if (!token) return; // Ensure the token is not null or undefined

        try {
          const decodedToken = jwtDecode<{ role: string }>(token);
          set({
            token, // Save the raw token, do not manipulate or stringify
            userRole: decodedToken.role,
            isHydrated: true,
          });
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      },
    }),
    {
      name: "auth-storage", // Key used in localStorage
      storage: createJSONStorage(() => localStorage), // Zustand handles serialization
    },
  ),
);
