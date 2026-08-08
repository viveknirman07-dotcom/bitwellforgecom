import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="portal flex items-center justify-center">
        <p className="text-[11px] tracking-[0.28em] uppercase portal-muted">Verifying access</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={`/account?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
