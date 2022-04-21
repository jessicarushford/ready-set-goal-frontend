import { getDaysInMonth } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";
import Calendar from "./Calendar";
import PieChart from "./PieChart";
import "./SummaryRoute.css";

const SummaryRoute = () => {
  const [achieved, setAchieved] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const uid: string | undefined = useParams().uid;
  const { user } = useContext(AuthContext);
  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const date = newDate.getDate();
  const params: QueryStringParams = {
    uid,
  };
  const daysInThisMonth = getDaysInMonth(new Date(year, month));
  const daysInLastMonth = getDaysInMonth(new Date(year, month - 1));
  const lastMonth = month === 0 ? 11 : month - 1;

  //filter goals by month and year
  const lastMonthGoals: Goal[] = goals.filter((goal) => {
    if (lastMonth === 11) {
      return (
        parseInt(goal.month) === lastMonth && parseInt(goal.year) === year - 1
      );
    } else {
      return parseInt(goal.month) === lastMonth && parseInt(goal.year) === year;
    }
  });

  const thisMonthGoals: Goal[] = goals.filter(
    (goal) => parseInt(goal.month) === month && parseInt(goal.year) === year
  );

  //count the number of each catagory of this month and last month by achieved or missed. will be used in pie charts.
  const nutritionAchieved: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "nutrition" && cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const nutritionMissed: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "nutrition" && !cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const exerciseAchieved: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "exercise" && cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const exerciseMissed: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "exercise" && !cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const leisureAchieved: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "leisure" && cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const leisureMissed: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "leisure" && !cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const financialAchieved: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "financial" && cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const financialMissed: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "financial" && !cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const personalAchieved: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "personal" && cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const personalMissed: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "personal" && !cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const otherAchieved: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "other" && cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const otherMissed: number = thisMonthGoals.reduce((prev, cur) => {
    if (cur.category === "other" && !cur.completed) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  console.log(nutritionAchieved);

  //filter last and this month goals to get only achieved goals.
  const trueGoalsLastMonth: Goal[] = lastMonthGoals.filter(
    (goal) => goal.completed
  );

  const trueGoalsThisMonth: Goal[] = thisMonthGoals.filter(
    (goal) => goal.completed
  );
  console.log(trueGoalsThisMonth);

  //achievement status last month
  const percentTrueLastMonth = Math.round(
    (trueGoalsLastMonth.length / daysInLastMonth) * 100
  );
  console.log(percentTrueLastMonth);

  //use in paragragh // achievement statud this month
  const percentTrueThisMonth = Math.round(
    (trueGoalsThisMonth.length / date) * 100
  );
  console.log(percentTrueThisMonth);

  //use in paragragh //compare achievement status between this month and last month
  const compareMonthPercentages = percentTrueThisMonth - percentTrueLastMonth;
  console.log(compareMonthPercentages);

  const getAndSetTodaysGoal = (params: QueryStringParams) => {
    getGoals(params).then((response) => {
      setGoals(response);
    });
  };

  useEffect(() => {
    getAndSetTodaysGoal(params);
  }, []);

  return (
    <div className="SummaryRoute">
      <h2>{user?.displayName?.toLowerCase()}'s goal summary</h2>
      <div className="summary-text">
        {compareMonthPercentages > 0 ? (
          <p>
            Great job {user?.displayName}! You have achieved{" "}
            {percentTrueThisMonth}% of your goals this month! That is a{" "}
            {compareMonthPercentages}% increase from last month!
          </p>
        ) : (
          <p>
            Nice try {user?.displayName}! You have achieved{" "}
            {percentTrueThisMonth}% of your goals this month. That is a{" "}
            {Math.abs(compareMonthPercentages)}% decrease from last month!
          </p>
        )}
      </div>
      <div className="pie-calendar">
        <div className="btns-pie">
          <h2>this month's pie chart</h2>
          <div className="btns">
            <button
              className={`btn ${achieved ? "onAchieved" : "achieved"}`}
              onClick={() => setAchieved(true)}
            >
              ACHIEVED
            </button>

            <button
              className={`btn ${achieved ? "missed" : "onMissed"}`}
              onClick={() => setAchieved(false)}
            >
              MISSED
            </button>
          </div>

          <PieChart
            achieved={achieved}
            nutritionAchieved={nutritionAchieved}
            nutritionMissed={nutritionMissed}
            exerciseAchieved={exerciseAchieved}
            exerciseMissed={exerciseMissed}
            leisureAchieved={leisureAchieved}
            leisureMissed={leisureMissed}
            financialAchieved={financialAchieved}
            financialMissed={financialMissed}
            personalAchieved={personalAchieved}
            personalMissed={personalMissed}
            otherAchieved={otherAchieved}
            otherMissed={otherMissed}
          />
        </div>
        <Calendar />
      </div>
    </div>
  );
};

export default SummaryRoute;
