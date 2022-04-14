import "./TodaysCard.css";
import note from "../assets/note.png";
import Goal from "../models/Goal";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import QueryStringParams from "../models/QueryStringParams";

interface Props {
  goal: Goal;
  onAddLike?: (userUid: string) => void;
  onUnLike?: (userUid: string) => void;
}

const TodaysCard = ({ goal, onAddLike, onUnLike }: Props) => {
  const { user } = useContext(AuthContext);

  // const getAndSetGoals = (id: string): void => {
  //   getGoals(uid).then((response)=>{
  //     setTodaysGoal(response)
  //   })
  // }

  //   const goalComplete = (id: string): void => {
  //     goalIsCompleted(id).then((response) => {
  //       setTodaysGoal(response)
  //     });
  //   };

  //   const goalMissed = (id: string): void => {
  // goalIsMissed(id).then((response)=>{
  //   setTodaysGoal(response)
  // })
  //   }

  const isUidInLikes = (goal: Goal, user: any): boolean => {
    return goal.likes!.some((like) => like === user.uid);
  };
  // const isComplete = () => {
  //   // create fxn that changes boolean from false to true when check icon is clicked
  // };

  return (
    <div className="TodaysCard">
      <div className="todays-card-container">
        <img src={note} alt="note-for-goal" />
        <div className="goal-text">
          <i className="fa-solid fa-circle-check"></i>
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
