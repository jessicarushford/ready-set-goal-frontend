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
}
//date, goalText, name will be on a card.
const GoalCard = ({ goal }: Props) => {
  const { user } = useContext(AuthContext);
  const [updatedGoal, setUpdatedGoal] = useState<Goal>();
  const [countLikes, setCountLikes] = useState(goal.likes?.length);
  const [likes, setLikes] = useState<[]>([]);
  const location = useLocation();
  const path = location.pathname;
  // const userUid: string | undefined = useParams().uid;

  const addLike = (id: string, userUid: string): void => {
    getUserByUid(user!.uid).then((response) => {
      if (response) {
        addUidToLikes(id, userUid).then((response) => {
          console.log(response);
          setUpdatedGoal(response);
          setCountLikes(goal.likes?.length);
        });
      }
    });
  };

  const unLike = (id: string, userUid: string): void => {
    takeOffUidFromLikes(id, userUid).then((response) =>
      setUpdatedGoal(response)
    );
    setCountLikes(goal.likes?.length);
  };

  const isUidInLikes = (userUid: string): boolean => {
    return likes.some((like) => like === userUid);
  };

  //click it how I can get the uid who clicked

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
            {user && isUidInLikes(user.uid) ? (
              <i
                className="fa-solid fa-thumbs-up"
                onClick={() => unLike(goal._id!, user.uid)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-thumbs-up"
                onClick={() => addLike(goal._id!, user.uid)}
              ></i>
            )}

            {goal ? <p>Likes: {countLikes! + 1}</p> : <p>Loading</p>}
          </div>
        ) : (
          <p>{goal.name}</p>
        )}
      </div>
    </li>
  );
};

export default GoalCard;
