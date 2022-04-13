import "./OtherUserRoute.css";
import Goal from "../models/Goal";
import { useContext, useEffect, useState } from "react";
import GoalCard from "./GoalCard";
import { getGoals } from "../services/GoalsService";
import { useParams } from "react-router-dom";
import TodaysCard from "./TodaysCard";
import { addNewFriend, deleteFriend } from "../services/UserService";
import Friend from "../models/Friend";
import AuthContext from "../context/AuthContext";

// interface Props {
//   goal: Goal;
// }
// Goal Cards of other users (Today's + Past Achieved or Missed)
const OtherUserRoute = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const uid: string | undefined = useParams().uid;
  const { user } = useContext(AuthContext);
  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  // const addFriend = (uid: string): void => {
  //   addNewFriend(uid).then((response) => {
  //     setFriends(response.friends);
  //   });
  // };

  // const removeFriend = (uid: string): void => {
  //   deleteFriend(uid).then(() => {
  //     setFriends(friends);
  //   });
  // };

  // const isFriend = (uid: string): boolean =>
  //   friends.some((friend) => friend.uid === uid);

  // const achievedGoals = (): void => {
  //   goals.map((goal) => {
  //     if (goal.completed) {
  //       <div>
  //         <GoalCard key={goal._id} goal={goal} />;
  //       </div>;
  //     }
  //   });
  // };

  // const missedGoals = () => {
  //   goals.map((goal) => {
  //     if (!goal.completed && goal.date !== `${month}.${date}.${year}`) {
  //       <div>
  //         <GoalCard key={goal._id} goal={goal} />;
  //       </div>;
  //     }
  //   });
  // };

  useEffect(() => {
    getGoals({ uid }).then((response) => {
      console.log(response);
      setGoals(response);
    });
  }, [uid]);

  return (
    <div className="OtherUserRoute">
      {/* <h2>{goals && goals[0].name.toLowerCase()}'s page</h2> */}
      <h3>TODAY'S GOAL</h3>
      {/* {user && isFriend(uid!) ? (
        <i
          className="fa-solid fa-user"
          onClick={() => {
            removeFriend(uid!);
          }}
        ></i>
      ) : (
        <i
          className="fa-regular fa-user"
          onClick={() => {
            addFriend(uid!);
          }}
        ></i>
      )} */}

      {/* {goals ? <TodaysCard goal={goals[0]} /> : <p>loading</p>} */}
      <h3>PREVIOUS GOALS</h3>
      <div className="achived">
        <button>ACHIEVED</button>
        <ul>
          {goals.map((goal) => {
            if (goal.completed) {
              <div>
                <GoalCard key={goal._id} goal={goal} />;
              </div>;
            }
          })}
        </ul>
      </div>
      <div className="missed">
        <button>MISSED</button>
        <ul>
          {goals.map((goal) => {
            if (!goal.completed && goal.date !== `${month}.${date}.${year}`) {
              <GoalCard key={goal._id} goal={goal} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default OtherUserRoute;
