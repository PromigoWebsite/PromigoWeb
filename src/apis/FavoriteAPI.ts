import axios from "./axios";

export const FavoriteAPI = {
  all: async ({ search, orderBy }: { search?: string; orderBy?: string }) => {
    return await axios.request({
      url: `/favorite/list`,
      method: "GET",
      params: {
        search,
        orderBy,
      },
    });
  },
  remove: async (id?: number) => {
    return await axios.request({
      url: `/favorite/delete/${id}`,
      method: "DELETE",
    });
  },
  add: async (id?: number) => {
    return await axios.request({
      url: `/favorite/add/${id}`,
      method: "PUT",
    });
  },
};
