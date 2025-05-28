import axios from "./axios";

export const RequestAPI = {
  get: async ({
    per_page,
    page,
    search,
  }: {
    per_page?: number;
    page?: number;
    search?: string;
  }) => {
    return await axios.request({
      url: `/request/list`,
      method: "GET",
      params: {
        per_page,
        page,
        search,
      },
    });
  },
  deleteById: async (id: number) => {
    return await axios.request({
      url: `/request/${id}/delete`,
      method: "DELETE",
    });
  },

  acceptById: async (id: number) => {
    return await axios.request({
      url: `/request/${id}/accept`,
      method: "POST",
    });
  },
};
