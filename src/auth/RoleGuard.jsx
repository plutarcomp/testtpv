// src/auth/RoleGuard.tsx
import { useAuthStore } from './authStore';
import { useNavigate } from '@tanstack/react-router';

export function RoleGuard(allowedRoles) {
  const { role, token } = useAuthStore();
  const navigate = useNavigate();

  if (!token || !allowedRoles.includes(role || '')) {
    navigate('/login');
    return null;
  }
  return true;
}