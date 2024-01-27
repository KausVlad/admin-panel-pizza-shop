import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export default function RequireAuth() {
  const { isLoading, localAuth } = useAuth();
  const { handleLogout } = useLogout();

  console.log(isLoading, localAuth);

  return isLoading ? (
    <>Loading...</>
  ) : localAuth ? (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
