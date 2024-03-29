import { EnumRole, UserInfo } from "../store/pizzaShopApi/auth.endpoints.types";

export const parseUserData = (userInfo: UserInfo | undefined) => {
  return (
    userInfo?.role === EnumRole.ADMIN ||
    userInfo?.role === EnumRole.MANAGER ||
    false
  );
};
