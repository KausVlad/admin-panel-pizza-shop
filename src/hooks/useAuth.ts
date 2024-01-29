import {
  setAuth,
  setUserAccessToken,
  setUserInfo,
} from "../store/auth/auth.slice";
import { useRefreshTokensMutation } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import { parseLoginData } from "../utils/parseLoginData";

export function useAuth() {
  const [refreshTokens, { isLoading }] = useRefreshTokensMutation();
  const dispatch = useDispatch();

  const refreshAuth = async () => {
    try {
      const accessToken = await refreshTokens().unwrap();
      const { localAuth, userInfo } = parseLoginData(accessToken);
      dispatch(setUserAccessToken(accessToken));
      userInfo && dispatch(setUserInfo({ userInfo }));
      dispatch(setAuth({ isAuth: localAuth }));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    refreshAuth,
    isLoading,
  };
}
