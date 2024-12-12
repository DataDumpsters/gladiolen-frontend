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
        try {
          const decodedToken = jwtDecode<{ role: string }>(token);
          set({ token, userRole: decodedToken.role, isHydrated: true });
          console.log("Token set successfully:", {
            token,
            userRole: decodedToken.role,
          });
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Hydration failed:", error);
          return;
        }
        if (state) {
          const token = state.token;
          if (token) {
            try {
              const decodedToken = jwtDecode<{ role: string }>(token);
              useAuthStore.setState({
                token,
                userRole: decodedToken.role,
                isHydrated: true,
              });
              console.log("Hydration complete:", {
                token,
                userRole: decodedToken.role,
              });
            } catch (error) {
              console.error("Failed to decode token during hydration:", error);
              useAuthStore.setState({ isHydrated: true });
            }
          } else {
            useAuthStore.setState({ isHydrated: true });
          }
        }
      },
    },
  ),
);
