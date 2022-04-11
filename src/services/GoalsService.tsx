import axios from "axios";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";

const baseURL: string = process.env.REACT_APP_API_URL || "";

//using axios, functions to hit APIs on goalRouter in backend

//get all goals with empty params or get all goals with given uid in Dashboard in HomeRoute
export const getGoals = async (params: QueryStringParams): Promise<Goal[]> => {
  return (await axios.get(`${baseURL}/goals`, { params })).data;
};

//get a goal by id in DetailsRoute
export const getGoalById = async (id: string): Promise<Goal> => {
  return (await axios.get(`${baseURL}/goals/details/${encodeURIComponent(id)}`))
    .data;
};

//add a goal when a NewGoalForm in MeRoute is submitted
export const addGoal = async (newGoal: Goal): Promise<Goal> => {
  return (await axios.post(`${baseURL}/goals`, newGoal)).data;
};

//delete a goal by id in MeRoute
export const deleteGoal = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/goals/${encodeURIComponent(id)}`))
    .data;
};

//increment 1 of likes
export const plusLikes = async (id: string): Promise<Goal> => {
  return (await axios.put(`${baseURL}/goals/${encodeURIComponent(id)}`)).data;
};

//decrement 1 of likes
export const minusLikes = async (id: string): Promise<Goal> => {
  return (await axios.put(`${baseURL}/goals/update/${encodeURIComponent(id)}`))
    .data;
};
