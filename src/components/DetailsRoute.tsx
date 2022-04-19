import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Goal from "../models/Goal";
import {
  addComment,
  addUidToLikes,
  deleteComment,
  getGoalById,
  getGoals,
  takeOffUidFromLikes,
} from "../services/GoalsService";
import CommentForm from "./CommentForm";
import "./DetailsRoute.css";
import GoalCard from "./GoalCard";
import Comment from "../models/Comment";
import AuthContext from "../context/AuthContext";
import QueryStringParams from "../models/QueryStringParams";

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

  //when the comment form is submitted, add new comment in the goal's comment list
  const addNewComment = (newComment: Comment): void => {
    addComment(id!, newComment).then(() => {
      getAndSetGoal(id!);
    });
  };

  //can delete a comment only if the writer of the comment is the current user(me)
  const removeComment = (): void => {
    deleteComment(id!, user?.uid!).then(() => {
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
      <h3>comments</h3>
      <ul className="comment-list">
        {goal?.comments?.map((comment) => (
          <li className="comment">
            <p className="comment-name">{comment.name}:</p>
            <p className="comment-text">{comment.commentText}</p>
            <i className="fa-regular fa-trash-can" onClick={removeComment}></i>
          </li>
        ))}
      </ul>
      {user && <CommentForm onAddComment={addNewComment} />}
    </div>
  );
};

export default DetailsRoute;
