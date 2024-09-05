import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,
  role: null,
  id: null,
  email: null,
  phone: null,
  programa: null,
  setToken: (token) => set({ token }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  setRole: (role) => set({ role }),
  logout: () => set({ 
    token: null,
    refreshToken: null,
    role: null,
    id: null,
    email: null,
    phone: null,
    program: null,
    }),
}));