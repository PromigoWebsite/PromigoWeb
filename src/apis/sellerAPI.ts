import { PromoSorting } from "../models/Promo_sorting";
import axios from "./axios";

export const SellerAPI = {
  get: async ({
    per_page,
    page,
    search,
    sorting,
    id,
  }: {
    per_page?: number;
    page?: number;
    search?: string;
    sorting?: PromoSorting;
    id: number,
  }) => {
    return await axios.request({
      url: `/seller/list/${id}`,
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
