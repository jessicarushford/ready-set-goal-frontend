import { Link, useLocation } from "react-router-dom";
import Goal from "../models/Goal";
import note from "../assets/note.png";
import "./GoalCard.css";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

//TODO
//to add like button in the goal card -
//to add timer for today (if the date === today's date)
//user.displaName should be clickable (if user is truthy)

interface Props {
  goal: Goal;
}
//date, goalText, name will be on a card.
const GoalCard = ({ goal }: Props) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;
  //user && isFave ? change the color and decrement likes : change the color of button and increment likes
  // const addLikes = (id: string): void => {
  //   plusLikes(id!).then((response) => setGoal(response));
  // };

  //timer -> use library 'date-fns'

  return (
    <li className="GoalCard">
      <div className="goal-content">
        <Link to={`/goals/details/${goal._id}`}>
          <img src={note} alt="note for goal" />
          <div className="goal-text">
            <p>{goal.date}</p>
            <p>{goal.goalText}</p>
          </div>
        </Link>
        {user && path === `/goals/details/${goal._id}` ? (
          <>
            <Link to={`/users/${goal.uid!}`}>
              <p>{goal.name}</p>
            </Link>
            <button>likes</button>
            {goal ? <p>Likes: {goal.likes}</p> : <p>Loading</p>}
          </>
        ) : (
          <p>{goal.name}</p>
        )}
      </div>
    </li>
  );
};

export default GoalCard;
