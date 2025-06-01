import { AdminPromoFilter } from "../models/Admin_promo_filter";
import { PromoSorting } from "../models/Promo_sorting";
import axios from "./axios";

export const SellerAPI = {
  get: async ({
    per_page,
    page,
    search,
    sorting,
    filter,
    id,
  }: {
    per_page?: number;
    page?: number;
    search?: string;
    sorting?: PromoSorting;
    filter?: AdminPromoFilter;
    id: number;
  }) => {
    return await axios.request({
      url: `/seller/list/${id}`,
      method: "GET",
      params: {
        per_page,
        page,
        search,
        sorting,
        filter,
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
