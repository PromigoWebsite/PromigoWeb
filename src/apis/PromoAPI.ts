import { PromoPaginated } from "../models/Promo_Paginated";
import axios from "./axios"

export const PromoAPI = {
    all: async() => {
        return await axios.request({
            url: "/promos",
            method: "GET",
            params: {
                page: 'all',
            },
        });
    },
    getPaginated: async (parameter : PromoPaginated) => {
        return await axios.request({
            url: "/promos",
            method: "GET",
            params: {
                page: parameter.page,
                per_page: parameter.per_page,
                filter: parameter.filter,
                sorting: parameter.sorting,
                search: parameter.search,
            }
        })
    },
    get: async (search: string) => {
        return await axios.request({
            url: "promo/search",
            method: "GET",
            params: {
                search,
            }
        })
    }
}