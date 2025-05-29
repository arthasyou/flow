import type { RouteObject } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/protected/Home";
import LogoutPage from "@/pages/protected/Logout";
import WorkflowPage from "@/pages/protected/Workflow";

export const protectedRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "logout",
      element: <LogoutPage />,
    },
    {
      path: "workflow",
      element: <WorkflowPage />,
    },
  ],
};
