import { create } from "zustand";
import fetchWithAuth from "@/app/utils/fetchWithAuth";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: (id: number) => void;
  fetchUsers: () => Promise<User[]>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),
  fetchUsers: async () => {
    try {
      const response = await fetchWithAuth("http://localhost:8080/user/all");
      if (response.ok) {
        const data = await response.json();
        set({ users: data });
        return data;
      } else {
        console.error("Failed to fetch users");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}));
