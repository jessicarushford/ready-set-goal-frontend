import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Goal from "../models/Goal";
import "./NewGoalForm.css";

interface Props {
  onAddGoal: (newGoal: Goal) => void;
  detailCategory: string;
  detailGoalText: string;
}

const NewGoalForm = ({ onAddGoal, detailCategory, detailGoalText }: Props) => {
  const [category, setCategory] = useState("");
  const [goalText, setGoalText] = useState("");

  const { user } = useContext(AuthContext);

  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const newGoal: Goal = {
      uid: user!.uid,
      name: user!.displayName as string,
      goalText,
      category,
      date: `${month}.${date}.${year}`,
      day: `${date}`,
      month: `${month - 1}`,
      year: `${year}`,
      comments: [],
      likes: [],
      completed: false,
    };
    onAddGoal(newGoal);
  };

  return (
    <form className="NewGoalForm" onSubmit={submitHandler}>
      <select
        name="category"
        id="category"
        className="form-content"
        value={detailCategory ? detailCategory : category}
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
        className="form-content"
        name="goalText"
        id="goalText"
        cols={30}
        rows={10}
        maxLength={80}
        value={detailGoalText ? detailGoalText : goalText}
        placeholder="Today my goal is to ..."
        required
        onChange={(e) => setGoalText(e.target.value)}
      ></textarea>
      <button className="add-btn">ADD TODAY'S GOAL</button>
    </form>
  );
};

export default NewGoalForm;
