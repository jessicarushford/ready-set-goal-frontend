import { useContext, useEffect, useState } from "react";
import { getTodaysQuote } from "../services/ZenQuotesService";
import ZenQuoteResponse from "../models/ZenQuoteResponse";
import "./DashboardRoute.css";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import { getGoals } from "../services/GoalsService";
import GoalCard from "./GoalCard";
import mainNote from "../assets/images/main-note.png";
import { getUserByUid } from "../services/UserService";
import User from "../models/User";
import { Link } from "react-router-dom";

// PUT IN HOME ROUTE
const DashboardRoute = () => {
  const [quote, setQuote] = useState<ZenQuoteResponse>();
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState<Goal[]>([]);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const lastLoginDate = `${month}${day}${year}`;

  // const isLastLoginToday = (uid: string): void => {
  //   getUserByUid(uid).then((response) =>
  //     response.lastLogin === lastLoginDate ? true : false
  //   );
  // };

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
      {user ? <h2>welcome, {user.displayName?.toLowerCase()}</h2> : <h2></h2>}
      <div className="quote">
        <img src={mainNote} alt="Main Note" className="main-note" />
        {quote ? <p className="quote-p">"{quote.q}"</p> : <p>Loading</p>}
        {quote ? <p className="author-p">-{quote.a}</p> : <p>Loading</p>}
      </div>
      <ul className="goals">
        {goals.map((goal) => (
          <GoalCard key={goal._id} goal={goal} />
        ))}
      </ul>
      <div>
        <p>
          You missed your goal yesterday! Do you want to re-set it to your
          Today's Goal?
        </p>
        {/* <Link to={`/users/me/${user!.uid}`}>
          <p>YES PLEASE</p>
        </Link>
      </div>
      <div>
        <p>Congrats! You completed your goal yesterday!</p>
        <Link to={`/users/me/${user!.uid}`}>
          <p>LET'S GO!</p>
        </Link> */}
      </div>
    </div>
  );
};

//{quote.a} / {quote ? <p>{quote.q}</p> : <p>Loading</p>} why different?

export default DashboardRoute;
