import { createRouteConfig } from '@tanstack/react-router';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { RoleGuard } from '../auth/RoleGuard';

const rootRoute = createRouteConfig({
  component: MainLayout,
});

// eslint-disable-next-line no-unused-vars
const routes = rootRoute.addChildren([
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
    layout: AuthLayout,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter: RoleGuard(['admin', 'superuser', 'coach', 'user']),
  },
]);

export const routeConfig = rootRoute;