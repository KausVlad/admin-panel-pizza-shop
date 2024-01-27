import { jwtDecode } from "jwt-decode";
import { LoginData } from "../store/pizzaShopApi/auth.endpoints.types";
import { CustomJwtPayload } from "../store/auth/auth.slice.types";

export const parseLoginData = (data: LoginData | undefined) => {
  const userInfo = data ? jwtDecode<CustomJwtPayload>(data?.accessToken) : null;
  const localAuth =
    userInfo?.role === "ADMIN" || userInfo?.role === "MANAGER" || false;
  return { userInfo, localAuth };
};
