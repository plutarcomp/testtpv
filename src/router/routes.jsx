import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "../components/Root";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterStep1Page from "../pages/auth/RegisterStep1Page";
import RegisterStep2Page from "../pages/auth/RegisterStep2Page";
import InitialPage from "../pages/InitialPage";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: InitialPage,
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

const registerStep1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$programa/register/step1",
  component: RegisterStep1Page,
});

const registerStep2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$programa/register/step2",
  component: RegisterStep2Page,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  registerStep1Route,
  registerStep2Route,
]);