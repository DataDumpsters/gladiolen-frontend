import { create } from "zustand";
import fetchWithAuth from "@/app/utils/fetchWithAuth";

interface UnionStore {
  unions: Union[];
  filteredUnion: Union | null;
  setFilteredUnion: (union: Union | null) => void;
  setUnions: (unions: Union[]) => void;
  addUnion: (union: Union) => void;
  updateUnion: (union: Union) => void;
  removeUnion: (id: number) => void;
  fetchUnions: () => Promise<Union[]>;
}

export const useUnionStore = create<UnionStore>((set) => ({
  unions: [],
  filteredUnion: null,
  setFilteredUnion: (union) => set({ filteredUnion: union }),
  setUnions: (unions) => set({ unions }),
  removeUnion: (id) =>
    set((state) => ({
      unions: state.unions.filter((union) => union.id !== id),
    })),
  addUnion: (union) =>
    set((state) => ({
      unions: [...state.unions, union],
    })),
  updateUnion: (union) =>
    set((state) => ({
      unions: state.unions.map((u) => (u.id === union.id ? union : u)),
    })),
  fetchUnions: async () => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:8080/api/union/all",
      );
      if (response.ok) {
        const data = await response.json();
        set({ unions: data });
        return data;
      } else {
        console.error("Failed to fetch unions");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}));
