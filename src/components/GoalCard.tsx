import { Link, useLocation, useParams } from "react-router-dom";
import Goal from "../models/Goal";
import note from "../assets/note.png";
import "./GoalCard.css";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { addUidToLikes, takeOffUidFromLikes } from "../services/GoalsService";
import { getUserByUid } from "../services/UserService";

//TODO
//to add like button in the goal card - //decrement likes
//to add timer for today (if the date === today's date)
//user.displaName should be clickable (if user is truthy)

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

  // const addLike = (id: string, userUid: string): void => {
  //   addUidToLikes(id, userUid).then(() => {
  //     setCountLikes(goal.likes?.length);
  //   });
  // };

  // const unLike = (id: string, userUid: string): void => {
  //   takeOffUidFromLikes(id, userUid).then(() =>
  //     setCountLikes(goal.likes?.length)
  //   );
  // };

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
              </div>
            </Link>
          ) : (
            <>
              <img src={note} alt="note for goal" />
              <div className="goal-text">
                <p>{goal.date}</p>
                <p>{goal.goalText}</p>
              </div>
            </>
          )}
        </div>
        {user && path === `/goals/details/${goal._id}` ? (
          <div className="name-likes">
            <Link to={`/users/${goal.uid!}`}>
              <p>{goal.name}</p>
            </Link>
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

            {goal ? <p>Likes: {goal.likes!.length}</p> : <p>Loading</p>}
          </div>
        ) : (
          <p>{goal.name}</p>
        )}
      </div>
    </li>
  );
};

export default GoalCard;
