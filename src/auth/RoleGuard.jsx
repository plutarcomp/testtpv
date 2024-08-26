// src/auth/RoleGuard.tsx
import { useAuthStore } from './authStore';
import { useNavigate } from 'react-router-dom';

export function RoleGuard(allowedRoles) {
  const { role, token } = useAuthStore();
  const navigate = useNavigate();

  if (!token || !allowedRoles.includes(role || '')) {
    navigate('/login');
    return null;
  }
  return true;
}