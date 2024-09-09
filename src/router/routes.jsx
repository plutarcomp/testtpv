import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "../components/Root";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/auth/RegisterPage";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$programa/login",
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$programa/dashboard",
  component: DashboardPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$programa/register",
  component: RegisterPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  registerRoute,
]);