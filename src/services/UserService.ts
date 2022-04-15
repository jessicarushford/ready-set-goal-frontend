import axios from "axios";
import Friend from "../models/Friend";
import User from "../models/User";

const baseURL: string = process.env.REACT_APP_USERS_API_URL || "";

export const getUserByUid = async (uid: string): Promise<User> => {
  return (await axios.get(`${baseURL}/${encodeURIComponent(uid)}`)).data;
};

export const createNewUser = async (
  uid: string,
  name: string
): Promise<User> => {
  return (
    await axios.post(baseURL, {
      uid,
      friends: [],
      name,
    })
  ).data;
};

export const addNewFriend = async (
  uid: string,
  newFriend: Friend
): Promise<User> => {
  return (await axios.put(`${baseURL}/${encodeURIComponent(uid)}`, newFriend))
    .data;
};

export const deleteFriend = async (
  userUid: string,
  friendUid: string
): Promise<void> => {
  return (
    await axios.put(
      `${baseURL}/${encodeURIComponent(userUid)}/friends/${encodeURIComponent(
        friendUid
      )}`
    )
  ).data;
};

export const addLastLogin = async (uid: string): Promise<void> => {
  return await axios.put(`${baseURL}/lastLogin/${encodeURIComponent(uid)}`);
};
