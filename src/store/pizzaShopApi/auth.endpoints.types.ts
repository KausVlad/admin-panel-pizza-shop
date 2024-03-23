export type LoginData = {
  accessToken: string;
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
  birthDate: Date;
  sex: "MALE" | "FEMALE" | "OTHER";
  role: "ADMIN" | "MANAGER" | "USER";
  createdAt: Date;
  userPhoto: string;
};
