export type LoginData = {
  accessToken: string;
};

export type AuthData = {
  accessToken: string;
  userInfo: UserInfo;
};

export type Credentials = {
  email?: string;
  phone?: string;
  password: string;
};

export type UserInfo = {
  id: number;
  email: string;
  userName: string;
  phone: string;
  address: string;
  birthDate: string;
  sex: EnumSex;
  role: EnumRole;
  createdAt: Date;
  updatedAt: Date;
  userPhoto: string;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateUserCredentials = {
  oldPassword: string;
  email: string | undefined;
  phone: string | undefined;
};

export type UpdateUserInfo = {
  userName: string | undefined;
  address: string | undefined;
  birthDate: string | undefined;
  sex: EnumSex | undefined;
};

export enum EnumSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum EnumRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}
