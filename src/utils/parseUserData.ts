import { UserInfo } from "../store/pizzaShopApi/auth.endpoints.types";

export const parseUserData = (userInfo: UserInfo | undefined) => {
  return userInfo?.role === "ADMIN" || userInfo?.role === "MANAGER" || false;
};
