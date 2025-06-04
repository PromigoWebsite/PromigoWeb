import { ExtendedReportFilter } from "../models/Extended_report_filter";
import { ReportSorting } from "../models/Report_sorting";
import axios from "./axios";

export const ReportAPI = {
  addReport: async ({value,id,userId}:{value?: string, id?: number, userId?: number}) => {
    return await axios.request({
      url: `/report/${id}`,
      method: "POST",
      params: {
        value,
        userId,
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
    sorting?: ReportSorting;
    filter?: ExtendedReportFilter;
  }) => {
    return await axios.request({
      url: `/report/list`,
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
  deleteById: async (id:number) => {
    return await axios.request({
        url: `/report/${id}/delete`,
        method: "DELETE",
    })
  }
};
