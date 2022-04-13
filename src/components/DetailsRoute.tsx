import { FormEvent, useContext, useEffect, useState } from "react";
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
import Comment from "../models/Comment";
import AuthContext from "../context/AuthContext";

// Detail Goal Card + Comment Form
const DetailsRoute = () => {
  const { user } = useContext(AuthContext);
  const [goal, setGoal] = useState<Goal | undefined>();
  const id: string | undefined = useParams().id;

  const getAndSetGoal = (id: string): void => {
    getGoalById(id).then((response) => {
      setGoal(response);
    });
  };

  const addNewComment = (newComment: Comment): void => {
    addComment(id!, newComment).then(() => {
      getAndSetGoal(id!);
    });
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
      {user && <CommentForm onAddComment={addNewComment} />}
    </div>
  );
};

export default DetailsRoute;
