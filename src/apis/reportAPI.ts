import axios from "./axios";

export const ReportAPI = {
    addReport: async(value?: string, id?:number) => {
        return await axios.request({
            url: `/report/${id}`,
            method: "POST",
            params: {
                value
            },
        });
    },
};
