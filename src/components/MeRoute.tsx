import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Calendar from "./Calendar";
import "./MeRoute.css";
import NewGoalForm from "./NewGoalForm";

// New Goal Form + Previous Achieved/Missed Goal Cards + Calendar

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="MeRoute">
      <h2>{user!.displayName}'s goals</h2>
      <h3>TODAY'S GOAL</h3>
      <NewGoalForm />
      <button>PREVIOUS GOALS</button>
      <Calendar />
    </div>
  );
};

export default MeRoute;
