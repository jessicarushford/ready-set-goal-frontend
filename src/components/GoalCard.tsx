import { useState } from "react";
import { Link } from "react-router-dom";
import Goal from "../models/Goal";
import note from "../assets/note.png";
import "./GoalCard.css";

interface Props {
  goal: Goal;
}
//date, goalText, name will be on a card.
const GoalCard = ({ goal }: Props) => {
  return (
    <li className="GoalCard">
      <Link to={`/goals/details/${goal._id}`}>
        <img src={note} alt="note for goal" />
      </Link>
      <div className="goal-text">
        <p>{goal.date}</p>
        <p>{goal.goalText}</p>
        <p>{goal.name}</p>
      </div>
    </li>
  );
};

export default GoalCard;
