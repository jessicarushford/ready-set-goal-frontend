import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Goal from "../models/Goal";
import {
  addComment,
  addUidToLikes,
  getGoalById,
  takeOffUidFromLikes,
} from "../services/GoalsService";
import CommentForm from "./CommentForm";
import "./DetailsRoute.css";
import GoalCard from "./GoalCard";

// Detail Goal Card + Comment Form
const DetailsRoute = () => {
  const [goal, setGoal] = useState<Goal | undefined>();
  const id = useParams().id;

  const getAndSetGoal = (id: string): void => {
    getGoalById(id).then((response) => {
      setGoal(response);
    });
  };

  const addNewComment = (id: string): void => {
    addComment(id);
  };

  const addLike = (userUid: string): void => {
    addUidToLikes(id!, userUid).then(() => {
      getAndSetGoal(id!);
    });
  };

  const unLike = (userUid: string): void => {
    takeOffUidFromLikes(id!, userUid).then(() => getAndSetGoal(id!));
  };

  //get a goal
  useEffect(() => {
    getAndSetGoal(id!);
  }, [id]);

  return (
    <div className="DetailsRoute">
      {goal ? (
        <GoalCard
          goal={goal}
          key={goal._id}
          onAddLike={addLike}
          onUnLike={unLike}
        />
      ) : (
        <p>Loading</p>
      )}
      <ul>
        {goal?.comments?.map((comment) => (
          <li>
            <p>{comment.name}</p>
            <p>{comment.commentText}</p>
          </li>
        ))}
      </ul>
      <CommentForm onAddComment={addNewComment} />
    </div>
  );
};

export default DetailsRoute;
