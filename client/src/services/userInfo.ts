export interface UserInfo {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  sessionToken: string;
};

export type UserField =
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "sessionToken";
