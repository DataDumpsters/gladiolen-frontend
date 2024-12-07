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
    const decodedToken = jwtDecode<{ role: string }>(token);
    set({ token, userRole: decodedToken.role });
  },
}));
