import "./TodaysCard.css";
import note from "../assets/note.png";
import Goal from "../models/Goal";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface Props {
  goal: Goal;
}

const TodaysCard = ({ goal }: Props) => {
  const { user } = useContext(AuthContext);

  const isComplete = () => {
    // create fxn that changes boolean from false to true when check icon is clicked
  };

  return (
    <div className="TodaysCard">
      <div className="todays-card-container">
        <img src={note} alt="note-for-goal" />
        <div className="goal-text">
          <i className="fa-solid fa-circle-check"></i>
          <p>{goal.date}</p>
          <p>{goal.goalText}</p>
          {/* <p>time left: {}</p> */}
          <i className="fa-solid fa-thumbs-up"></i>
          <p>{goal.name}</p>
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
