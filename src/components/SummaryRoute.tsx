import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Calendar from "./Calendar";
import "./SummaryRoute.css";

const SummaryRoute = () => {
  const [achieved, setAchieved] = useState(true);

  const { user } = useContext(AuthContext);

  return (
    <div className="SummaryRoute">
      <h2>{user?.displayName?.toLowerCase()}'s goal summary</h2>
      <div>
        <p>Great job {user?.displayName}! ...</p>
      </div>
      <div className="btns">
        <button
          className={`btn ${achieved ? "onAchieved" : "achieved"}`}
          onClick={() => setAchieved(false)}
        >
          ACHIEVED
        </button>

        <button
          className={`btn ${achieved ? "missed" : "onMissed"}`}
          onClick={() => setAchieved(true)}
        >
          MISSED
        </button>
      </div>
      <div>PIE CHART?</div>
      {/* <Calendar />
      <Calendar /> */}
      {/* previous month calendar */}
    </div>
  );
};

export default SummaryRoute;
