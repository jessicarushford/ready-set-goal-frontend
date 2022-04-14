import { Link, useLocation, useParams } from "react-router-dom";
import Goal from "../models/Goal";
import note from "../assets/note.png";
import "./GoalCard.css";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { addUidToLikes, takeOffUidFromLikes } from "../services/GoalsService";
import { getUserByUid } from "../services/UserService";

interface Props {
  goal: Goal;
  onAddLike?: (userUid: string) => void;
  onUnLike?: (userUid: string) => void;
}
//date, goalText, name will be on a card.
const GoalCard = ({ goal, onAddLike, onUnLike }: Props) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;

  const isUidInLikes = (goal: Goal, user: any): boolean => {
    return goal.likes!.some((like) => like === user.uid);
  };

  //timer -> use library 'date-fns'? maybe make another component

  return (
    <li className="GoalCard">
      <div className="goal-content">
        <div>
          {path === "/dashboard" ? (
            <Link to={`/goals/details/${goal._id}`}>
              <img src={note} alt="note for goal" />
              <div className="goal-text">
                <p>{goal.date}</p>
                <p>{goal.goalText}</p>
                <p className="name">{goal.name}</p>
              </div>
            </Link>
          ) : user && path === `/goals/details/${goal._id}` ? (
            <div className="detail-goal">
              <img src={note} alt="note for goal" />
              <div className="goal-text">
                <p>{goal.date}</p>
                <p>{goal.goalText}</p>
                <Link to={`/users/${goal.uid!}`}>
                  <p className="name">{goal.name}</p>
                </Link>
              </div>

              {user && isUidInLikes(goal, user) ? (
                <i
                  className="fa-solid fa-thumbs-up"
                  onClick={() => onUnLike!(user.uid)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-thumbs-up"
                  onClick={() => onAddLike!(user.uid)}
                ></i>
              )}

              {goal ? (
                <p className="count-likes">Likes: {goal.likes!.length}</p>
              ) : (
                <p>Loading</p>
              )}
            </div>
          ) : (
            <>
              <img src={note} alt="note for goal" />
              <div className="goal-text">
                <p>{goal.date}</p>
                <p>{goal.goalText}</p>
                <p className="name">{goal.name}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default GoalCard;
