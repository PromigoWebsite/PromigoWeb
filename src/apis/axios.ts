
import Axios from "axios";
import api from "./api";

const axios = Axios.create({
    baseURL: api.BaseUrlAPI,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

export default axios;