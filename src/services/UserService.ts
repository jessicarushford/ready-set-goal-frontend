import axios from "axios";
import User from "../models/User";

const baseURL: string = process.env.REACT_APP_USERS_API_URL || "";

export const getUserByUid = async (uid: string): Promise<User> => {
  return (await axios.get(`${baseURL}/${encodeURIComponent(uid)}`)).data;
};

export const createNewUser = async (uid: string): Promise<User> => {
  return (
    await axios.post(baseURL, {
      uid,
      friends: [],
    })
  ).data;
};

export const addNewFriend = async (uid: string): Promise<User> => {
  return (await axios.put(`${baseURL}/${encodeURIComponent(uid)}`)).data;
};

export const deleteFriend = async (uid: string): Promise<void> => {
  return (await axios.put(`${baseURL}/update/${encodeURIComponent(uid)}`)).data;
};
