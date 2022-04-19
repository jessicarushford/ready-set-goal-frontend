import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import {
  addGoal,
  addUidToLikes,
  getGoals,
  goalIsCompleted,
  goalIsMissed,
  takeOffUidFromLikes,
} from "../services/GoalsService";
import Calendar from "./Calendar";
import "./MeRoute.css";
import NewGoalForm from "./NewGoalForm";
import TodaysCard from "./TodaysCard";
import { useLocation } from "react-router-dom";

// New Goal Form + Today's coard + Previous Achieved/Missed Goal Cards + Calendar
const MeRoute = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [todaysGoal, setTodaysGoal] = useState<Goal | undefined>();
  const uid: string | undefined = useParams().uid;
  const { user } = useContext(AuthContext);
  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const fullDate = `${month}.${date}.${year}`;
  const params: QueryStringParams = {
    uid,
  };
  const location: any = useLocation();
  console.log(location.state.goal.category);

  //get all goals of a user with a given uid and set goals and set today's goal where todays's date and goal's date are matched
  const getAndSetTodaysGoal = (params: QueryStringParams) => {
    getGoals(params).then((response) => {
      setGoals(response);
      const todaysgoal = response.find((goal) => goal.date === fullDate);
      setTodaysGoal(todaysgoal);
    });
  };

  const addLike = (userUid: string): void => {
    addUidToLikes(todaysGoal!._id!, userUid).then(() => {
      getAndSetTodaysGoal(params);
    });
  };

  const unLike = (userUid: string): void => {
    takeOffUidFromLikes(todaysGoal!._id!, userUid).then(() =>
      getAndSetTodaysGoal(params)
    );
  };

  //when form is submitted add newGol as today's goal
  const addTodaysGoal = (newGoal: Goal): void => {
    addGoal(newGoal).then((response) => {
      setTodaysGoal(response);
    });
  };

  //by calling this fxn, today's goal's complete status will be true
  const goalCompleted = (id: string): void => {
    goalIsCompleted(id).then((response) => {
      getAndSetTodaysGoal(response);
    });
  };

  //by calling this fxn, today's goal's complete status will be false
  const goalMissed = (id: string): void => {
    goalIsMissed(id).then((response) => {
      getAndSetTodaysGoal(response);
    });
  };

  useEffect(() => {
    getAndSetTodaysGoal(params);
  }, []);

  return (
    <div className="MeRoute">
      {user ? (
        <>
          <div>
            <h2>{user!.displayName?.toLowerCase()}'s goals</h2>
            <h3>TODAY'S GOAL</h3>
          </div>
          {todaysGoal ? (
            <TodaysCard
              todaysGoal={todaysGoal}
              onAddLike={addLike}
              onUnLike={unLike}
              onGoalCompleted={goalCompleted}
              onGoalMissed={goalMissed}
            />
          ) : (
            <NewGoalForm
              onAddGoal={addTodaysGoal}
              detailCategory={location.state.goal.category}
              detailGoalText={location.state.goal.goalText}
            />
          )}
          <Link to={`/users/me/previous/${encodeURIComponent(user!.uid)}`}>
            <button className="previous-btn">PREVIOUS GOALS</button>
          </Link>
          <Calendar todaysGoal={todaysGoal} />
        </>
      ) : (
        <button onClick={signInWithGoogle}>LOGIN</button>
      )}
    </div>
  );
};

export default MeRoute;
