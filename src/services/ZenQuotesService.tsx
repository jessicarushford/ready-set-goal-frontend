import axios from "axios";
import ZenQuoteResponse from "../ZenQuoteResponse";

const baseURL: string = process.env.REACT_APP_QUOTE_URL || "";

export const getDailyQuote = async (): Promise<ZenQuoteResponse> => {
  return (await axios.get(baseURL)).data;
};
