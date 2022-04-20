import axios from "axios";

const baseURL: string = process.env.REACT_APP_QUOTE_URL || "";

export const getTodaysQuote = async (): Promise<any> => {
  return (await axios.get(baseURL)).data;
};
