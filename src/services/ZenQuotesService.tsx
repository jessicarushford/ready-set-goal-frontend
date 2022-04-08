import axios from "axios";
import ZenQuoteResponse from "../model/ZenQuoteResponse";

const baseURL: string = process.env.REACT_APP_QUOTE_URL || "";

export const getDailyQuote = (): Promise<ZenQuoteResponse[]> => {
  return axios.get(baseURL).then((response) => {
    console.log(response);
    return response.data;
  });
};

