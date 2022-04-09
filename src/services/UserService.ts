import axios from "axios";
import User from "../models/User";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getUserById = async (uid: string): Promise<User> => {
  return (await axios.get(`${baseURL}/users/${encodeURIComponent(uid)}`)).data;
};

export const createNewUser = async (uid: string): Promise<User> => {
  return (await axios.post(`${baseURL}/users/${encodeURIComponent(uid)}`)).data;
};

export const addNewFriend = async (uid: string): Promise<User> => {
  return (await axios.put(`${baseURL}/users/${encodeURIComponent(uid)}`)).data;
};

export const deleteFriend = async (uid: string): Promise<void> => {
  return (await axios.put(`${baseURL}/users/update/${encodeURIComponent(uid)}`))
    .data;
};
