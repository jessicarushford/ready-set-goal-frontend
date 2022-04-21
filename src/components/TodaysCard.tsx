import "./TodaysCard.css";
import notePink from "../assets/images/notePink.png";
import Goal from "../models/Goal";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";

interface Props {
  todaysGoal: Goal;
  onAddLike?: (userUid: string) => void;
  onUnLike?: (userUid: string) => void;
  onGoalCompleted?: (id: string) => void;
  onGoalMissed?: (id: string) => void;
}

const TodaysCard = ({
  todaysGoal,
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

  console.log(todaysGoal);

  return (
    <div className="TodaysCard">
      <div className="todays-card-container">
        <img src={notePink} alt="note-for-goal" />
        <div className="goal-text">
          {user && path === `/users/me/${user!.uid}` ? (
            todaysGoal.completed ? (
              <i
                className="fa-solid fa-circle-check"
                onClick={() => onGoalMissed!(todaysGoal._id!)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-circle-check"
                onClick={() => onGoalCompleted!(todaysGoal._id!)}
              ></i>
            )
          ) : (
            <></>
          )}

          <p>{todaysGoal.date}</p>
          <p>{todaysGoal.goalText}</p>
          {/* <p>time left: {}</p> */}
          {user && isUidInLikes(todaysGoal, user) ? (
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
          {todaysGoal ? (
            <p className="count-likes">Likes: {todaysGoal.likes!.length}</p>
          ) : (
            <p>Loading</p>
          )}
          <p>{todaysGoal.name}</p>
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
