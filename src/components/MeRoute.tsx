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
  takeOffUidFromLikes,
} from "../services/GoalsService";
import Calendar from "./Calendar";
import "./MeRoute.css";
import NewGoalForm from "./NewGoalForm";
import TodaysCard from "./TodaysCard";

// New Goal Form + Previous Achieved/Missed Goal Cards + Calendar

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

  // const getAndSetGoals = (id: string): void => {
  //   getGoals(uid).then((response)=>{
  //     setTodaysGoal(response)
  //   })
  // }

  //   const goalComplete = (id: string): void => {
  //     goalIsCompleted(id).then((response) => {
  //       setTodaysGoal(response)
  //     });
  //   };

  //   const goalMissed = (id: string): void => {
  // goalIsMissed(id).then((response)=>{
  //   setTodaysGoal(response)
  // })
  //   }

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

  const addTodaysGoal = (newGoal: Goal): void => {
    addGoal(newGoal).then(() => {
      setTodaysGoal(newGoal);
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
              goal={todaysGoal}
              onAddLike={addLike}
              onUnLike={unLike}
            />
          ) : (
            <div className="new-goal-form-container">
              <NewGoalForm onAddGoal={addTodaysGoal} />
            </div>
          )}
          <Link to={`/users/me/previous/${encodeURIComponent(user!.uid)}`}>
            <button className="previous-btn">PREVIOUS GOALS</button>
          </Link>
          <Calendar />
        </>
      ) : (
        <button onClick={signInWithGoogle}>LOGIN</button>
      )}
    </div>
  );
};

export default MeRoute;
