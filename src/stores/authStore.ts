// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../models/user";

interface AuthState {
  user: User | null; // Thông tin người dùng
  token: string | null; // JWT token
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void; // Hành động logout
}

export const useAuthStore = create<AuthState>()(
  // Dùng persist nếu muốn lưu token vào localStorage tự động[citation:1][citation:2]
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }, // key trong localStorage
  ),
);
