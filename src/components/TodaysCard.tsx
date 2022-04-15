import "./TodaysCard.css";
import note from "../assets/note.png";
import Goal from "../models/Goal";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";

interface Props {
  goal: Goal;
  onAddLike?: (userUid: string) => void;
  onUnLike?: (userUid: string) => void;
  onGoalCompleted?: (id: string) => void;
  onGoalMissed?: (id: string) => void;
}

const TodaysCard = ({
  goal,
  onAddLike,
  onUnLike,
  onGoalCompleted,
  onGoalMissed,
}: Props) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;

  //checking if there is the uid in current user's like list
  const isUidInLikes = (goal: Goal, user: any): boolean =>
    goal.likes!.some((like) => like === user.uid);
  //we don't need isComplete function.

  return (
    <div className="TodaysCard">
      <div className="todays-card-container">
        <img src={note} alt="note-for-goal" />
        <div className="goal-text">
          {user && path === `/users/me/${user!.uid}` ? (
            goal.completed ? (
              <i
                className="fa-solid fa-circle-check"
                onClick={() => onGoalMissed!(goal._id!)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-circle-check"
                onClick={() => onGoalCompleted!(goal._id!)}
              ></i>
            )
          ) : (
            <></>
          )}

          <p>{goal.date}</p>
          <p>{goal.goalText}</p>
          {/* <p>time left: {}</p> */}
          {user && isUidInLikes(goal, user) ? (
            <i
              className="fa-solid fa-thumbs-up"
              onClick={() => onUnLike!(user.uid)}
            ></i>
          ) : (
            <i
              className="fa-regular fa-thumbs-up"
              onClick={() => onAddLike!(user?.uid!)}
            ></i>
          )}
          {goal ? (
            <p className="count-likes">Likes: {goal.likes!.length}</p>
          ) : (
            <p>Loading</p>
          )}
          <p>{goal.name}</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysCard;

// {isFav(singleRecipeCard.id) ? (
//     <i
//       className="fa-solid fa-heart"
//       onClick={() => removeFavorite(singleRecipeCard.id)}
//     ></i>
//   ) : (
//     <i
//       className="fa-regular fa-heart"
//       onClick={() => addFavorite(singleRecipeCard)}
//     ></i>
//   )}
