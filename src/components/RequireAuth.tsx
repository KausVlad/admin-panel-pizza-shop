import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function RequireAuth() {
  const [isLocalLoading, setLocalLoading] = useState(true);
  const { token, isAuth } = useSelector((state: RootState) => state.auth);
  const { refreshAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshAuth();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setLocalLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setLocalLoading(false);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLocalLoading ? (
    <>Loading...</>
  ) : isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
