import { PromoFilter } from "./Promo_filter";
import { PromoSorting } from "./Promo_sorting";

export interface PromoPaginated {
    page?: number,
    per_page?: number,
    search?: string,
    sorting?: PromoSorting,
    filter?: PromoFilter
};