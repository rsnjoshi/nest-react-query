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
    if (localStorage.getItem("sessionToken")) return true;
    else return false;
  },

  getUserInfo: (): UserInfo => {
    return {
      firstName: localStorage.getItem("firstName") || "",
      lastName: localStorage.getItem("lastName") || "",
      email: localStorage.getItem("email") || "",
      username: localStorage.getItem("username") || "",
      sessionToken: localStorage.getItem("sessionToken") || "",
    };
  },

  logOut: function (): void {
    this.clearSessionState();
  },
};
