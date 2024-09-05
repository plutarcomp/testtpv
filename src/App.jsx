import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./router/routes";

const router = createRouter({ routeTree });

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;