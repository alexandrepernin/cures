const TOKEN_KEY = "token";

export const LOGIN = "login";

export const SIGNUP = "signup";

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};
