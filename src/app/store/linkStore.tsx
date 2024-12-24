import { create } from "zustand";

// Create the Zustand store
export const useLinkStore = create((set) => ({
  activeRoute: "", // Initial active route is an empty string
  setActiveRoute: (route: string) => set({ activeRoute: route }), // Action to update the active route
}));
