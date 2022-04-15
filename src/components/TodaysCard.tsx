import "./TodaysCard.css";
import note from "../assets/note.png";
import Goal from "../models/Goal";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";

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
  // const [goals, setGoals] = useState<Goal[]>([]);
  const location = useLocation();
  const path = location.pathname;
  // const uid: string | undefined = useParams().uid;
  // const params: QueryStringParams = {
  //   uid,
  // };

  //checking if there is the uid in current user's like list
  const isUidInLikes = (goal: Goal, user: any): boolean =>
    goal.likes!.some((like) => like === user.uid);

  // useEffect(() => {}, [todaysGoal]);

  console.log(todaysGoal);

  return (
    <div className="TodaysCard">
      <div className="todays-card-container">
        <img src={note} alt="note-for-goal" />
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
