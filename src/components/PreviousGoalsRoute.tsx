import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import GoalCard from "./GoalCard";
import "./PreviousGoalsRoute.css";

const PreviousGoalsRoute = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="PreviousGoalsRoute">
      <h2>{user?.displayName?.toLowerCase()}'s goals</h2>
      <h3>PREVIOUS GOALS</h3>
      <button>ACHIEVED</button>
      <button>MISSED</button>
      <form>
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="SearchBar"
            placeholder="Search"
            name="SearchBar"
            id="SearchBar"
          ></input>
        </div>

        <div>
          <select name="category" id="category">
            <option value="" disabled hidden>
              Category
            </option>
            <option value="exercise">Exercise</option>
            <option value="financial">Financial</option>
            <option value="leisure">Leisure</option>
            <option value="nutrition">Nutrition</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div>{/* Search by date */}</div>
        {/* <button></button>SUBMIT BUTTON? */}
        <div>{/* <GoalCard /> MAP THRU GOAL CARDS OF SEARCH */}</div>
      </form>
    </div>
  );
};

export default PreviousGoalsRoute;
