import axios from "./axios"

export const TestAPI = {
    all: async function () {
        return await axios.request({
            url: `testdoang`,
            method: 'GET',
        })
        
    }
}