import { Link, useLocation } from "react-router-dom";
import Goal from "../models/Goal";
import note from "../assets/note.png";
import "./GoalCard.css";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { minusLikes, plusLikes } from "../services/GoalsService";

//TODO
//to add like button in the goal card - //decrement likes
//to add timer for today (if the date === today's date)
//user.displaName should be clickable (if user is truthy)

interface Props {
  goal: Goal;
}
//date, goalText, name will be on a card.
const GoalCard = ({ goal }: Props) => {
  const { user } = useContext(AuthContext);
  const [updatedGoal, setUpdatedGoal] = useState<Goal>();
  const [likes, setLikes] = useState(goal.likes);
  const [liked, setLiked] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const addLike = (id: string): void => {
    plusLikes(id).then((response) => setUpdatedGoal(response));
    setLikes(likes! + 1);
    setLiked(true);
  };

  const cancelLike = (id: string): void => {
    minusLikes(id).then((response) => setUpdatedGoal(response));
    setLikes(likes! - 1);
    setLiked(false);
  };

  //?????need to make likes array(maybe) because when a user revisits a previous goal they liked, it should be saved so that the user can see whether they liked it or not.??? LIKED IS NOT SAVED

  //timer -> use library 'date-fns'maybe make another component

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
            {!liked ? (
              <i
                className="fa-regular fa-thumbs-up"
                onClick={() => addLike(goal._id!)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-thumbs-up"
                onClick={() => cancelLike(goal._id!)}
              ></i>
            )}

            {goal ? <p>Likes: {likes}</p> : <p>Loading</p>}
          </div>
        ) : (
          <p>{goal.name}</p>
        )}
      </div>
    </li>
  );
};

export default GoalCard;
