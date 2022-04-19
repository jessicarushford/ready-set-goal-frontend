import { Link, useLocation, useParams } from "react-router-dom";
import Goal from "../models/Goal";
import note from "../assets/note.png";
import "./GoalCard.css";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getGoalById } from "../services/GoalsService";

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
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const fullDate = `${month}.${day}.${year}`;
  const [testGoal, setTestGoal] = useState<Goal>(goal);

  const isUidInLikes = (goal: Goal, user: any): boolean => {
    return goal.likes!.some((like) => like === user.uid);
  };

  useEffect(() => {
    getGoalById(goal!._id!).then((response) => {
      setTestGoal(response);
    });
  }, []);
  //goal.name === user.displayName && there is no todays goal.
  //click? => add newGoal

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
                  <p className="name link-name">{goal.name}</p>
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
        {user && path === `/goals/details/${goal._id}` ? (
          !goal.completed ? (
            goal.date !== fullDate ? (
              <>
                <i className="fa-solid fa-x goal-result"></i>
                <p className="result-text missed">MISSED</p>
              </>
            ) : (
              <></>
            )
          ) : (
            <>
              <i className="fa-solid fa-star goal-result"></i>
              <p className="result-text complete">COMPLETE</p>
            </>
          )
        ) : (
          <></>
        )}
      </div>
      {user &&
      path === `/goals/details/${goal._id}` &&
      goal.date !== fullDate ? (
        <Link to={`/users/me/${user.uid}`} state={{ goal: goal }}>
          <i className="fa-solid fa-circle-question"></i>
        </Link>
      ) : (
        <></>
      )}
    </li>
  );
};

export default GoalCard;
