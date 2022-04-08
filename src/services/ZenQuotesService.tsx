import axios from "axios";

export const getTodaysQuote = async (): Promise<any> => {
  return (
    await axios.get(
      "http://localhost:5001/ready-set-goal-7b39c/us-central1/api"
    )
  ).data;
};
