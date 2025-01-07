import { create } from "zustand";
import fetchWithAuth from "@/app/utils/fetchWithAuth";
import { Tshirt } from "@/app/models/Tshirt";

interface TshirtStore {
  tshirts: Tshirt[];
  setTshirts: (tshirts: Tshirt[]) => void;
  addTshirt: (tshirt: Tshirt) => void;
  updateTshirt: (tsirt: Tshirt) => void;
  removeTshirt: (id: number) => void;
  fetchTshirts: (token: string | null) => Promise<Tshirt[]>;
}

export const useTshirtStore = create<TshirtStore>((set) => ({
  tshirts: [],
  setTshirts: (tshirts) => set({ tshirts }),
  removeTshirt: (id) =>
    set((state) => ({
      tshirts: state.tshirts.filter((tshirt) => tshirt.id !== id),
    })),
  addTshirt: (tshirt) =>
    set((state) => ({
      tshirts: [...state.tshirts, tshirt],
    })),
  updateTshirt: (tshirt) =>
    set((state) => ({
      tshirts: state.tshirts.map((u) => (u.id === tshirt.id ? tshirt : u)),
    })),
  fetchTshirts: async (token) => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:8080/api/tshirt/counts",
      );
      if (response.ok) {
        const data = await response.json();
        set({ tshirts: data });
        return data;
      } else {
        console.error("Failed to fetch tshirts");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}));
