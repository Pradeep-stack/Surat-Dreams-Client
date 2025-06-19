import axios from "axios";
import { baseUrl , imgBaseUrl, whatsuppUrl} from "../config/index";



const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
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
export const getWebsite = async () => {
  try {
    const { data } = await axios.get(baseUrl + `/get-website`);
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
export const updateUser = async (user, phone) => {
  try {
    const { data } = await axios.patch(baseUrl + `/update-user/${phone}`, user);
    return data;
  } catch (error) {
    return error;
  }
};
export const uploadImage = async (formData) => {
  try {
    const { data } = await axios.post( `${imgBaseUrl}/upload`, formData);
    return data;
  } catch (error) {
    return error;
  }
};

export const whatsAppApiSend = async (userData) => {
  const apiKey = "RlF2V052dTVIMEdqZm1wV2UwT0NjdDg4LXh2eFR5NXFGTkFsSGpoeGtBZzo="

  try {
    const { data } = await api.post(whatsuppUrl, userData, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status,
      responseData: error.response?.data 
    };
  }
};

