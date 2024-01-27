import { JwtPayload } from "jwt-decode";

export type authState = {
  userInfo: userInfo;
  token: string | null;
  isAuth: boolean;
};

export type userInfo = {
  email: string | null;
  role: "ADMIN" | "MANAGER" | "USER" | null;
  userName: string | null;
};

export type CustomJwtPayload = JwtPayload & userInfo;
