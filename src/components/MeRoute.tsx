import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Goal from "../models/Goal";
import { addGoal } from "../services/GoalsService";
import Calendar from "./Calendar";
import "./MeRoute.css";
import NewGoalForm from "./NewGoalForm";
import TodaysCard from "./TodaysCard";

// New Goal Form + Previous Achieved/Missed Goal Cards + Calendar
// Make display name toLowerCase?

const MeRoute = () => {
  const [todaysGoal, setTodaysGoal] = useState<Goal>();
  const { user } = useContext(AuthContext);

  const addTodaysGoal = (newGoal: Goal): void => {
    addGoal(newGoal).then(() => {
      setTodaysGoal(newGoal);
    });
  };

  useEffect(() => {
    addTodaysGoal(todaysGoal!);
  }, [todaysGoal]);

  return (
    <div className="MeRoute">
      {user ? (
        <>
          <div>
            <h2>{user!.displayName}'s goals</h2>
            <h3>TODAY'S GOAL</h3>
          </div>
          {todaysGoal ? (
            <TodaysCard goal={todaysGoal} />
          ) : (
            <div className="new-goal-form-container">
              <NewGoalForm onAddGoal={addTodaysGoal} />
            </div>
          )}
          <Link to={`/users/me/previous/${encodeURIComponent(user!.uid)}`}>
            <button>PREVIOUS GOALS</button>
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
