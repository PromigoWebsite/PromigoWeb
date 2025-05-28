import axios from "./axios";

export const ReportAPI = {
  addReport: async (value?: string, id?: number) => {
    return await axios.request({
      url: `/report/${id}`,
      method: "POST",
      params: {
        value,
      },
    });
  },
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
      url: `/report/list`,
      method: "GET",
      params: {
        per_page,
        page,
        search,
      },
    });
  },
  deleteById: async (id:number) => {
    return await axios.request({
        url: `/report/${id}/delete`,
        method: "DELETE",
    })
  }
};
