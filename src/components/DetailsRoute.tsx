import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Goal from "../models/Goal";
import { addComment, getGoalById } from "../services/GoalsService";
import CommentForm from "./CommentForm";
import "./DetailsRoute.css";
import GoalCard from "./GoalCard";

// Detail Goal Card + Comment Form
const DetailsRoute = () => {
  const [goal, setGoal] = useState<Goal | undefined>();
  const id = useParams().id;

  const addNewComment = (id: string): void => {
    addComment(id);
  };

  //get a goal
  useEffect(() => {
    getGoalById(id!).then((response) => {
      setGoal(response);
    });
  }, [id]);

  return (
    <div className="DetailsRoute">
      {goal ? <GoalCard goal={goal} key={goal._id} /> : <p>Loading</p>}
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
