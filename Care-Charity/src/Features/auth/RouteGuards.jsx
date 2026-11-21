import { Navigate, Outlet, useLocation } from "react-router";
import Button from "@/components/ui/Button";
import InfoBanner from "@/components/ui/InfoBanner";
import { canOpenPath, firstAllowedPath } from "@/config/access";
import PageFallback from "@/routes/PageFallback";
import Forbidden from "./components/Forbidden";
import { useAuth } from "./hooks/useAuth";
import { getSafeRedirect } from "./utils/redirect";

function SessionError() {
  const { error, reload, signOut } = useAuth();

  return (
    <div className="grid min-h-screen place-items-center bg-canvas p-6">
      <div className="w-full max-w-sm space-y-4">
        <InfoBanner variant="error">{error}</InfoBanner>
        <div className="flex gap-2">
          <Button onClick={reload}>Try again</Button>
          <Button variant="secondary" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

export function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <PageFallback />;
  if (status === "error") return <SessionError />;
  if (status === "guest") return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}

export function GuestOnly() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <PageFallback />;
  if (status === "error") return <SessionError />;
  if (status === "authenticated") return <Navigate to={getSafeRedirect(location.state?.from)} replace />;

  return <Outlet />;
}

export function RequireAccess() {
  const { flags } = useAuth();
  const { pathname } = useLocation();

  if (canOpenPath(flags, pathname)) return <Outlet />;
  const fallback = firstAllowedPath(flags);
  return fallback ? <Navigate to={fallback} replace /> : <Forbidden />;
}

export function HomeRedirect() {
  const { flags } = useAuth();
  const target = firstAllowedPath(flags);
  return target ? <Navigate to={target} replace /> : <Forbidden />;
}
