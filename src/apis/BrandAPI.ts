import { PromoSorting } from "../models/Promo_sorting";
import axios from "./axios";

export const BrandAPI = {
  all: async () => {
    return await axios.request({
      url: `/brands`,
      method: "GET",
      params: {
        page: "all",
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
      url: `/brands`,
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
      url: `/brand/${id}/delete`,
      method: "DELETE",
    });
  },
};
