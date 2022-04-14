import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";
import "./Calendar.css";

// Route to details of goal if clicked
const Calendar = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [todaysGoal, setTodaysGoal] = useState<Goal | undefined>();
  const uid: string | undefined = useParams().uid;
  const newDate: Date = new Date();
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const fullDate = `${month + 1}.${date}.${year}`;

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const monthName = monthNames[month];
  const params: QueryStringParams = {
    uid,
  };

  useEffect(() => {
    getGoals(params).then((response) => {
      setGoals(response);
    });
  }, []);
  useEffect(() => {
    getGoals(params).then((response) => {
      setGoals(response);
      const todaysgoal = response.find((goal) => goal.date === fullDate);
      setTodaysGoal(todaysgoal);
    });
  }, []);

  return (
    <div className="Calendar">
      <p>
        {monthName} {year}
      </p>
      <ul>
        {goals &&
          goals.map(
            (goal) =>
              goal !== todaysGoal && (
                <Link to={`/goals/details/${goal._id}`}>
                  <li className="goal-date">
                    <p className="hide">{goal.date}</p>
                    {goal.completed ? (
                      <i className="fa-solid fa-star"></i>
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )}
                  </li>
                </Link>
              )
          )}
      </ul>
    </div>
  );
};

export default Calendar;
