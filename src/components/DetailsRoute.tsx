import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Goal from "../models/Goal";
import { getGoalById, plusLikes } from "../services/GoalsService";
import CommentForm from "./CommentForm";
import "./DetailsRoute.css";
import GoalCard from "./GoalCard";

//TODO

//comments->read is just goal.comment
//maybe we should add api to update goal for comment
//put comment Form here

// Detail Goal Card + Comment Form
const DetailsRoute = () => {
  const [goal, setGoal] = useState<Goal>();

  // const [comments, setComments] = useState<Comment[]>();
  const id = useParams().id;

  useEffect(() => {
    getGoalById(id!).then((response) => {
      console.log(response);
      setGoal(response);
    });
  }, [id]);

  //useEffect comment

  return (
    <div className="DetailsRoute">
      {goal ? <GoalCard goal={goal} key={goal._id} /> : <p>Loading</p>}

      <CommentForm />
    </div>
  );
};

export default DetailsRoute;
