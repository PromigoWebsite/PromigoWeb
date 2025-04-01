import axios from "./axios"

export const BrandAPI = {
    all: async () => {
        return await axios.request({
            url: `/brands`,
            method: "GET",
            params: {
                page: "all",
            }
        })
    },
}