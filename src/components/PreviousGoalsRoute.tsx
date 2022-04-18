import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";
import GoalCard from "./GoalCard";
import "./PreviousGoalsRoute.css";

const PreviousGoalsRoute = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [achieved, setAchieved] = useState(true);
  const [todaysGoal, setTodaysGoal] = useState<Goal | undefined>();
  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const fullDate = `${month}.${date}.${year}`;
  const userUid: string | undefined = useParams().uid;
  const params: QueryStringParams = {
    uid: userUid,
  };
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const submitHandler = (e: FormEvent): void => {
    const params: any = {
      ...(keyword ? { keyword } : {}),
      ...(category ? { category } : {}),
      ...(filterDate ? { filterDate } : {}),
    };
    goals
      .filter((goal) => goal.category === goal.category)
      .map((goal) => {
        <GoalCard key={goal._id} goal={goal} />;
      });

    setKeyword("Search");
    setCategory("");
    setFilterDate("");
  };

  useEffect(() => {
    getGoals(params).then((response) => {
      console.log(response);
      setGoals(response);
      const todaysgoal = response.find((goal) => goal.date === fullDate);
      setTodaysGoal(todaysgoal);
    });
  }, []);

  return (
    <div className="PreviousGoalsRoute">
      <h2>{user?.displayName?.toLowerCase()}'s goals</h2>
      <h3>PREVIOUS GOALS</h3>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            className="SearchBar"
            placeholder="Search"
            name="SearchBar"
            id="SearchBar"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={submitHandler}
          ></i>
        </div>

        <div>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
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
      <button onClick={() => setAchieved(true)}>ACHIEVED</button>
      <button onClick={() => setAchieved(false)}>MISSED</button>
      <ul>
        {goals
          .filter((goal) => goal.completed === achieved && goal !== todaysGoal)
          .map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}
      </ul>
    </div>
  );
};

export default PreviousGoalsRoute;
