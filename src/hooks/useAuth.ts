import { useEffect } from "react";
import { setUserAccessToken, setUserInfo } from "../store/auth/auth.slice";
import { useRefreshTokensQuery } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../store/auth/auth.slice.types";

export function useAuth() {
  const { data, isLoading } = useRefreshTokensQuery();
  const dispatch = useDispatch();
  const userInfo = data ? jwtDecode<CustomJwtPayload>(data?.accessToken) : null;
  const localAuth =
    userInfo?.role === "ADMIN" || userInfo?.role === "MANAGER" || false;

  useEffect(() => {
    if (data && userInfo) {
      dispatch(setUserAccessToken(data));
      dispatch(setUserInfo({ userInfo }));
    }
  }, [data, dispatch, userInfo]);
  return { data, isLoading, localAuth };
}
