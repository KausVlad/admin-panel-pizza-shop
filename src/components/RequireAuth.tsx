import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { isLoading, localAuth } = useAuth();
  const location = useLocation();

  console.log(isLoading, localAuth);

  return isLoading ? (
    <>Loading...</>
  ) : localAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
