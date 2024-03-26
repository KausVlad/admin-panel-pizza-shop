// import { JwtPayload } from "jwt-decode";
import { UserInfo } from "../pizzaShopApi/auth.endpoints.types";

export type AuthState = {
  userInfo: PartialUserInfo;
  token: string | null;
  isAuth: boolean;
};

export type PartialUserInfo = Partial<UserInfo>;

// export type NullableUserInfo = {
//   [K in keyof UserInfo]: UserInfo[K] | null;
// };

// export type userInfoFromToken = {
//   email: string | null;
//   role: "ADMIN" | "MANAGER" | "USER" | null;
//   userName: string | null;
// };

// export type CustomJwtPayload = JwtPayload & userInfoFromToken;
