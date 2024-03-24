import {
  setAuth,
  setUserAccessToken,
  setUserInfo,
} from "../store/auth/auth.slice";
import { useRefreshTokensMutation } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import { parseUserData } from "../utils/parseUserData";

export function useAuth() {
  const [refreshTokens, { isLoading }] = useRefreshTokensMutation();

  const dispatch = useDispatch();

  const refreshAuth = async () => {
    try {
      const { accessToken, userInfo } = await refreshTokens().unwrap();
      const localAuth = parseUserData(userInfo);

      dispatch(setUserAccessToken(accessToken));
      dispatch(setUserInfo({ userInfo }));
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
