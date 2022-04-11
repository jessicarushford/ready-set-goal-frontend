import { useContext, useEffect, useState } from "react";
import { getTodaysQuote } from "../services/ZenQuotesService";
import ZenQuoteResponse from "../models/ZenQuoteResponse";
import "./DashboardRoute.css";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import { getGoals } from "../services/GoalsService";
import GoalCard from "./GoalCard";

// PUT IN HOME ROUTE
const DashboardRoute = () => {
  const [quote, setQuote] = useState<ZenQuoteResponse>();
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState<Goal[]>([]);

  //get a quote
  useEffect(() => {
    getTodaysQuote().then((response) => {
      console.log(response);
      setQuote(response);
    });
  }, []);

  //get all goals and will loop through goals array and call GoalCard.
  useEffect(() => {
    getGoals({}).then((response) => setGoals(response));
  }, []);
  return (
    <div className="DashboardRoute">
      {user ? <h2>welcome, {user.displayName}</h2> : <h2></h2>}
      <div className="quote">
        {quote ? <p>{quote.q}</p> : <p>Loading</p>}
        {quote ? <p>{quote.a}</p> : <p>Loading</p>}
      </div>
      <ul className="goals">
        {goals.map((goal) => (
          <GoalCard key={goal._id} goal={goal} />
        ))}
      </ul>
    </div>
  );
};

//{quote.a} / {quote ? <p>{quote.q}</p> : <p>Loading</p>} why different?

export default DashboardRoute;
