export interface UserInfo {
  id: string;
  username: string;
  email: string;
  accessToken: string;
};

export type UserField =
  | "id"
  | "username"
  | "email"
  | "accessToken";
