import request from "../helpers/request";

type LoginAndRegisterParams = {
  username: string;
  password: string;
};

function register(data: LoginAndRegisterParams) {
  return request({ url: "/auth/register", method: "post", data });
}

function login(data: LoginAndRegisterParams) {
  return request({ url: "/auth/login", method: "post", data });
}

function getInfo() {
  return request({ url: "/auth", method: "get" });
}

function logout() {
  return request({ url: "/auth/logout", method: "get" });
}

const ApiObj = {
  login,
  register,
  getInfo,
  logout,
};

export default ApiObj;
