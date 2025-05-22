
import { User } from "../models/User";
import axios from "./axios";
export const ProfileAPI = {
  editProfile: async (formdata: FormData, id: number) => {
    return await axios.request({
      url: `/profiles/edit/${id}`,
      method: "POST",
      data: formdata,
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};
