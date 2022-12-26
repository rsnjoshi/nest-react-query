import { UserInfo, UserField } from "./userInfo";

export default {
  setUserState: (credential: UserInfo): void => {
    const infoTitle: UserField[] = Object.keys(credential) as UserField[];
    infoTitle.forEach((title) => {
      localStorage.setItem(title, credential[title]);
    });
  },

  clearSessionState: (): void => {
    localStorage.clear();
  },

  isLoggedIn: (): boolean => {
    if (localStorage.getItem("accessToken")) return true;
    return false;
  },

  getUserInfo: (): UserInfo => {
    return {
      id: localStorage.getItem("id") || "",
      email: localStorage.getItem("email") || "",
      username: localStorage.getItem("username") || "",
      accessToken: localStorage.getItem("accessToken") || "",
    };
  },

  logOut: function (): void {
    this.clearSessionState();
  },
};
