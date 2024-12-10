import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  userRole: string | null;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userRole: null,
  setToken: (token: string) => {
    try {
      const decodedToken = jwtDecode<{ role: string }>(token);
      set({ token, userRole: decodedToken.role });
      console.log("State after setting token:", {
        token,
        userRole: decodedToken.role,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  },
}));
