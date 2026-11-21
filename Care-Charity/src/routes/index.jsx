import { createBrowserRouter } from "react-router";
import {
  GuestOnly,
  HomeRedirect,
  RequireAccess,
  RequireAuth,
} from "@/Features/auth";
import AppLayout from "@/layouts/AppLayout";
import PageFallback from "./PageFallback";
import RouteError from "./RouteError";

const page = (load) => async () => ({ Component: (await load()).default });

export const router = createBrowserRouter([
  {
    Component: GuestOnly,
    HydrateFallback: PageFallback,
    children: [
      { path: "login", lazy: page(() => import("@/pages/LoginPage")) },
    ],
  },
  {
    path: "/",
    Component: RequireAuth,
    HydrateFallback: PageFallback,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            ErrorBoundary: RouteError,
            children: [
              { index: true, Component: HomeRedirect },
              {
                Component: RequireAccess,
                children: [
                  {
                    path: "activity-log",
                    lazy: page(() => import("@/pages/ActivityLogPage")),
                  },
                  {
                    path: "users",
                    lazy: page(() => import("@/pages/UsersPage")),
                  },
                  {
                    path: "roles",
                    lazy: page(() => import("@/pages/RolesPage")),
                  },
                  {
                    path: "*",
                    lazy: page(() => import("@/pages/NotFoundPage")),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
