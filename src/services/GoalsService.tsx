import axios from "axios";
import Comment from "../models/Comment";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";

const baseURL: string = process.env.REACT_APP_GOALS_API_URL || "";

//using axios, functions to hit APIs on goalRouter in backend

//get all goals with empty params or get all goals with given uid in Dashboard in HomeRoute
export const getGoals = async (params: QueryStringParams): Promise<Goal[]> => {
  return (await axios.get(baseURL, { params })).data;
};

//get a goal by id in DetailsRoute
export const getGoalById = async (id: string): Promise<Goal> => {
  return (await axios.get(`${baseURL}/details/${encodeURIComponent(id)}`)).data;
};

//add a goal when a NewGoalForm in MeRoute is submitted
export const addGoal = async (newGoal: Goal): Promise<Goal> => {
  return (await axios.post(baseURL, newGoal)).data;
};

//delete a goal by id in MeRoute
export const deleteGoal = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
};

//add an uid who liked the goal
export const addUidToLikes = async (id: string, uid: string): Promise<Goal> => {
  return (
    await axios.put(
      `${baseURL}/${encodeURIComponent(id)}/likes/add/${encodeURIComponent(
        uid
      )}`
    )
  ).data;
};

//take off an uid who unliked the goal
export const takeOffUidFromLikes = async (
  id: string,
  uid: string
): Promise<Goal> => {
  return (
    await axios.put(
      `${baseURL}/${encodeURIComponent(id)}/likes/delete/${encodeURIComponent(
        uid
      )}`
    )
  ).data;
};

//Add new comment
export const addComment = async (
  id: string,
  newComment: Comment
): Promise<Goal> => {
  return (
    await axios.put(
      `${baseURL}/new-comment/${encodeURIComponent(id)}`,
      newComment
    )
  ).data;
};
