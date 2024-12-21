import axios from "axios";
import { baseUrl ,imgBaseUrl} from "../config/index";


export const getUser = async (id) => {
  try {
    const { data } = await axios.get(baseUrl + `/get-user/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(baseUrl + `/allusers`);
    return data;
  } catch (error) {
    return error;
  }
};

export const registerUser = async (user) => {
  try {
    const { data } = await axios.post(baseUrl + `/register`, user);
    return data;
  } catch (error) {
    return error;
  }
};
export const uploadImage = async (formData) => {
  try {
    const { data } = await axios.post(imgBaseUrl + `/upload`, formData);
    return data;
  } catch (error) {
    return error;
  }
};
