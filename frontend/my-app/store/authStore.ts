import { create } from "zustand";
import { User, UserRole } from "../types/api-types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isBranchUser: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  isAdmin: () => get().user?.role === UserRole.admin,
  isBranchUser: () => get().user?.role === UserRole.branch
}));
