import request from "../helpers/request";
import { friendlyDate } from "@/helpers/utils";

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

function getAll() {
  return new Promise((resolve, reject) => {
    request({ url: "/notebooks" })
      .then(res => {
        res.data = res.data.data.sort((notebook1, notebook2) =>
          notebook1.createdAt < notebook2.createdAt ? -1 : 1
        );
        res.data.forEach(notebook => {
          notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt);
        });
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateNotebook(notebookId: string, { title = "" } = { title: "" }) {
  return request({
    url: `/notebooks/${notebookId}`,
    method: "PATCH",
    data: { title },
  });
}

function deleteNotebook(notebookId: string) {
  return request({ url: `/notebooks/${notebookId}`, method: "DELETE" });
}

function addNotebook({ title = "" } = { title: "" }) {
  return request({ url: "/notebooks", method: "POST", data: { title } });
}

const ApiObj = {
  login,
  register,
  getInfo,
  logout,
  getAll,
  updateNotebook,
  deleteNotebook,
  addNotebook,
};

export default ApiObj;
