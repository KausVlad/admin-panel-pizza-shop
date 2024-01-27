import { useEffect } from "react";
import { setUserAccessToken, setUserInfo } from "../store/auth/auth.slice";
import { useRefreshTokensQuery } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import { parseLoginData } from "../utils/parseLoginData";

export function useAuth() {
  const { data, isLoading } = useRefreshTokensQuery();
  const dispatch = useDispatch();
  const { localAuth, userInfo } = parseLoginData(data);

  useEffect(() => {
    if (data && userInfo) {
      dispatch(setUserAccessToken(data));
      dispatch(setUserInfo({ userInfo }));
    }
  }, [data, dispatch, userInfo]);
  return { data, isLoading, localAuth };
}
