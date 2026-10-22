import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import PageFallback from "./PageFallback";
import RouteError from "./RouteError";
 
const page = (load) => async () => ({ Component: (await load()).default });

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    HydrateFallback: PageFallback,
    children: [
      {
       
        ErrorBoundary: RouteError,
        children: [
          { index: true, element: <Navigate to="/activity-log" replace /> },  
          { path: "activity-log", lazy: page(() => import("@/pages/ActivityLogPage")) },
          { path: "*", lazy: page(() => import("@/pages/NotFoundPage")) },
        ],
      },
    ],
  },
]);
