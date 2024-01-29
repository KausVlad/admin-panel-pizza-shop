import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function RequireAuth() {
  const [isLocalLoading, setLocalLoading] = useState(true);
  const { token, isAuth } = useSelector((state: RootState) => state.auth);
  const { isLoading, refreshAuth } = useAuth();
  const { handleLogout } = useLogout();

  useEffect(() => {
    // let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshAuth();
      } catch (error) {
        console.error(error);
      } finally {
        setLocalLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setLocalLoading(false);

    // return () => (isMounted = false);
  }, []);

  console.log(
    isLocalLoading,
    token ? token.slice(-11) : null,
    isAuth,
    isLoading
  );

  // return <Outlet />;
  return isLocalLoading ? (
    <>Loading...</>
  ) : isAuth ? (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
