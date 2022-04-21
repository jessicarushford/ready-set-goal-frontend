import { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";
import GoalCard from "./GoalCard";
import "./PreviousGoalsRoute.css";

const PreviousGoalsRoute = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completed, setCompleted] = useState("");
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
  const [searchParams] = useSearchParams();
  const goalKeyword = searchParams.get("keyword");
  const goalCategory = searchParams.get("category");
  const goalFilterDate = searchParams.get("filterDate");
  const goalComplete = searchParams.get("completed");
  console.log(goalCategory, goalKeyword, goalFilterDate);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const params: any = {
      ...(keyword ? { keyword } : {}),
      ...(category ? { category } : {}),
      ...(filterDate ? { filterDate } : {}),
      ...(completed ? { completed } : {}),
    };

    navigate(`/users/me/previous/${user?.uid!}?${new URLSearchParams(params)}`);
    setKeyword("");
    setCategory("");
    setFilterDate("");
    setCompleted("");
  };

  useEffect(() => {
    getGoals(params).then((response) => {
      console.log(response);
      setGoals(response);
      const todaysgoal = response.find((goal) => goal.date === fullDate);
      setTodaysGoal(todaysgoal);
    });
  }, []);

  //make month(one digit) to Two digit with 0 when it's 1~9.
  const toTwoDigits = (num: number): any => {
    return num.toString().padStart(2, "0");
  };

  //fuction to filter goals with searchParams only if they are truthy.
  const filterGoals = () => {
    let filteredArray = goals;
    if (goalKeyword) {
      filteredArray = filteredArray.filter((goal) =>
        goal.goalText.toLowerCase().includes(goalKeyword.toLowerCase())
      );
    }
    if (goalCategory) {
      filteredArray = filteredArray.filter(
        (goal) => goal.category === goalCategory
      );
    }
    if (goalFilterDate) {
      filteredArray = filteredArray.filter(
        (goal) =>
          `${goal.year}-${toTwoDigits(parseInt(goal.month) + 1)}-${toTwoDigits(
            parseInt(goal.day)
          )}` === goalFilterDate
      );
    }
    if (goalComplete) {
      const boolean: boolean = goalComplete === "achieved" ? true : false;
      filteredArray = filteredArray.filter(
        (goal) => goal.completed === boolean
      );
    }

    console.log(filteredArray);
    return filteredArray;
  };

  return (
    <div className="PreviousGoalsRoute">
      <h2>{user?.displayName?.toLowerCase()}'s goals</h2>
      <h3>PREVIOUS GOALS</h3>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            className="searchBar"
            placeholder="Search"
            name="searchBar"
            id="searchBar"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={submitHandler}
          ></i>
        </div>

        <div className="select">
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
          {/* <i className="fa-solid fa-angle-down"></i> */}

          <input
            type="date"
            name="date"
            id="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          <select
            name="completed"
            id="completed"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
          >
            <option value="" disabled hidden>
              Completed?
            </option>
            <option value="achieved">Achieved</option>
            <option value="missed">Missed</option>
          </select>
        </div>
        <button className="submit-btn">SUBMIT</button>
      </form>

      <ul>
        {filterGoals().map((goal) => (
          <Link to={`/goals/details/${goal._id}`}>
            <GoalCard key={goal._id} goal={goal} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PreviousGoalsRoute;
