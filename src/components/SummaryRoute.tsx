import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Calendar from "./Calendar";
import "./SummaryRoute.css";

const SummaryRoute = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="SummaryRoute">
      <h2>{user?.displayName?.toLowerCase()}'s goal summary</h2>
      <div>
        <p>Great job {user?.displayName}! ...</p>
      </div>
      <button>ACHIEVED</button>
      <button>MISSED</button>
      <div>PIE CHART?</div>
      {/* <Calendar />
      <Calendar /> */}
      {/* previous month calendar */}
    </div>
  );
};

export default SummaryRoute;
