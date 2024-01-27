import { useEffect } from "react";
import { setUserAccessToken } from "../store/auth/auth.slice";
import { useRefreshTokensQuery } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../store/auth/auth.slice.types";

export function useAuth() {
  const { data, isLoading } = useRefreshTokensQuery();
  const dispatch = useDispatch();
  const jwt = data ? jwtDecode<CustomJwtPayload>(data.accessToken) : null;
  const localAuth = jwt?.role === "ADMIN" || jwt?.role === "MANAGER" || false;

  useEffect(() => {
    if (data) {
      dispatch(setUserAccessToken(data));
    }
  }, [data, dispatch]);
  return { data, isLoading, localAuth };
}
