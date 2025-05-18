import axios from "./axios";

export const AuthAPI = {
  login: async (data: any) => {
    return await axios.request({
      url: `/login`,
      method: "POST",
      data: data,
    });
  },
  user: async () => {
    return await axios.request({
      url: `/user`,
      method: "GET",
    });
  },
  logout: async () => {
    return await axios.request({
      url: "/logout",
      method: "POST",
    });
  },
  register: async (data: any) => {
    return await axios.request({
      url: `/register`,
      method: "POST",
      data: data,
    });
  },
};
