import { PromoSorting } from "../models/Promo_sorting";
import axios from "./axios";

export const AdminAPI = {
  get: async ({
    per_page,
    page,
    search,
    sorting,
  }: {
    per_page?: number;
    page?: number;
    search?: string;
    sorting?: PromoSorting;
  }) => {
    return await axios.request({
      url: `/admin/list`,
      method: "GET",
      params: {
        per_page,
        page,
        search,
        sorting,
      },
    });
  },

  deleteById: async (id: number) => {
    return await axios.request({
      url: `/admin/delete/${id}`,
      method: "DELETE",
    });
  },
};
