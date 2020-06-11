export const TOKEN_KEY = "token";

export const LOGIN = "login";

export const SIGNUP = "signup";

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};

export const execFetch = async (path,method,body) => {
  let response = null;
  if (method==="POST"){
    response = await fetch(path, {
      method: method,
      headers: {"Content-Type": "application/json"},
      body: body,
    });
  }
  else {
    response = await fetch(path, {
      method: method,
      headers: {"Content-Type": "application/json"},
    });
  }
  const info = await response.json()
  return info;
};
