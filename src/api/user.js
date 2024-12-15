import axios from "axios";
import { baseUrl } from "../config/index";

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(baseUrl+`/get-user/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(baseUrl+`/allusers`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (user) => {
  try {
    const { data } = await axios.post(baseUrl+`/register`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};
