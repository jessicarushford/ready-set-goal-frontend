import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import "./NewGoalForm.css";

interface Props {
  onAddGoal: (newGoal: Goal) => void;
}

const NewGoalForm = ({ onAddGoal }: Props) => {
  const [category, setCategory] = useState("");
  const [goalText, setGoalText] = useState("");

  const { user } = useContext(AuthContext);

  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  const navigate = useNavigate();

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const newGoal: Goal = {
      uid: user!.uid,
      name: user!.displayName as string,
      goalText,
      category,
      date: `${month}.${date}.${year}`,
      comments: [],
      likes: 0,
      completed: false,
    };
    onAddGoal(newGoal);
    navigate(`/users/me/todays-goal/${encodeURIComponent(user!.uid)}`);
  };

  return (
    <form className="NewGoalForm" onSubmit={submitHandler}>
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
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
      <textarea
        name="goalText"
        id="goalText"
        cols={30}
        rows={10}
        value={goalText}
        required
        onChange={(e) => setGoalText(e.target.value)}
      ></textarea>
      <button className="add-btn">ADD TODAY'S GOAL</button>
    </form>
  );
};

export default NewGoalForm;
