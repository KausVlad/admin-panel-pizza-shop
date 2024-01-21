import { JwtPayload } from "jwt-decode";

export type CustomJwtPayload = JwtPayload & {
  email: string;
  role: "ADMIN" | "MANAGER" | "USER";
  userName: string;
};
