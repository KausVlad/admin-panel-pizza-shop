import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { RootState } from "../store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { isLoading, localAuth } = useAuth();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  console.log(isLoading, localAuth, isAuth);

  return isLoading ? (
    <>Loading...</>
  ) : localAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
