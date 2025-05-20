import { PromoFilter } from "../models/Promo_filter";
import { PromoPaginated } from "../models/Promo_Paginated";
import axios from "./axios"

export const PromoAPI = {
  all: async ({
    search,
    sort,
    filter,
  }: {
    search?: string;
    sort?: string;
    filter?: PromoFilter;
  }) => {
    return await axios.request({
      url: "/promos",
      method: "GET",
      params: {
        page: "all",
        search,
        sort,
        filter,
      },
    });
  },
  getPaginated: async (parameter: PromoPaginated) => {
    return await axios.request({
      url: "/promos",
      method: "GET",
      params: {
        page: parameter.page,
        per_page: parameter.per_page,
        filter: parameter.filter,
        sorting: parameter.sorting,
        search: parameter.search,
      },
    });
  },
  get: async (id?: string) => {
    return await axios.request({
      url: `/promo/${id}`,
      method: "GET",
      params: {
        id,
      },
    });
  },
  newest: async () => {
    return await axios.request({
      url: `/promo/newest`,
      method: "GET",
    });
  },
  reccomendation: async () => {
    return await axios.request({
      url: `/promo/recommendation`,
      method: "GET",
    });
  },
  checkLike: async (id?: number) => {
    return await axios.request({
      url: `/promo/liked/${id}`,
      method: "GET",
    });
  },
};