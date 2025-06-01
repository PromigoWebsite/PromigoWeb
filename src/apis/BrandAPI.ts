import { BrandSorting } from "../models/brand_sorting";
import { ExtendedBrandFilter } from "../models/Extended_brand_filter";
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
    sorting,
    filter,
  }: {
    per_page?: number;
    page?: number;
    search?: string;
    sorting?: BrandSorting;
    filter?: ExtendedBrandFilter;
  }) => {
    return await axios.request({
      url: `/brands`,
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
      url: `/brand/${id}/delete`,
      method: "DELETE",
    });
  },
  getById: async (id: number) => {
    return await axios.request({
      url: `/brand/${id}`,
      method: "GET",
    });
  },
  editProfile: async (formdata: FormData, id: number) => {
    return await axios.request({
      url: `/brand/${id}/edit`,
      method: "POST",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addProfile: async (formdata: FormData) => {
    return await axios.request({
      url: `/brand/add`,
      method: "POST",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
