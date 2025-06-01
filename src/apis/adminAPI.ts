import { AdminPromoFilter } from "../models/Admin_promo_filter";
import { PromoSorting } from "../models/Promo_sorting";
import axios from "./axios";

export const AdminAPI = {
  get: async ({
    per_page,
    page,
    search,
    sorting,
    filter,
  }: {
    per_page?: number;
    page?: number;
    search?: string;
    sorting?: PromoSorting;
    filter?: AdminPromoFilter
  }) => {
    return await axios.request({
      url: `/admin/list`,
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
      url: `/admin/${id}/delete`,
      method: "DELETE",
    });
  },

  save: async function ({ id, data }: { id?: number; data: FormData }) {
    return await axios.request({
      url: !id ? "/admin/add" : `/admin/${id}/edit`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
  },
};
