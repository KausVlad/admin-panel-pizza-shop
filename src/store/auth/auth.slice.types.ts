import { JwtPayload } from "jwt-decode";

export type CustomJwtPayload = JwtPayload & {
  email: string;
  role: string;
  userName: string;
};
