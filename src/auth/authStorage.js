import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,
  role: null,
  id: null,
  firstName: null,
  LastName: null,
  username: null,
  email: null,
  phone: null,
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  logout: () => set({ 
    token: null,
    refreshToken: null,
    role: null,
    id: null,
    firstName: null,
    LastName: null,
    username: null,
    email: null,
    phone: null
    }),
}));