import { createRootRoute, createRoute } from "@tanstack/react-router";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { Root } from "../components/Root";
import NotFoundPage from "../pages/NotFoundPage";

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
  path: "/login/$programa",
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/$programa",
  component: DashboardPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
]);