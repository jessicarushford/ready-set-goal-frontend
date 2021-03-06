import "./OtherUserRoute.css";
import Goal from "../models/Goal";
import { useContext, useEffect, useState } from "react";
import GoalCard from "./GoalCard";
import {
  addUidToLikes,
  getGoals,
  takeOffUidFromLikes,
} from "../services/GoalsService";
import { useNavigate, useParams } from "react-router-dom";
import TodaysCard from "./TodaysCard";
import {
  addNewFriend,
  deleteFriend,
  getUserByUid,
} from "../services/UserService";
import Friend from "../models/Friend";
import AuthContext from "../context/AuthContext";
import User from "../models/User";
import QueryStringParams from "../models/QueryStringParams";

// Goal Cards of other users (Today's + Past Achieved or Missed)
const OtherUserRoute = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [otherUser, setOtherUser] = useState<User>();
  const [achieved, setAchieved] = useState(true);
  const [todaysGoal, setTodaysGoal] = useState<Goal | undefined>();
  const otherUserUid: string | undefined = useParams().uid;
  const { user } = useContext(AuthContext);
  const newDate: Date = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const fullDate = `${month}.${date}.${year}`;
  const params: QueryStringParams = {
    uid: otherUserUid,
  };
  const navigate = useNavigate();

  const getAndSetTodaysGoal = (params: QueryStringParams) => {
    getGoals(params).then((response) => {
      setGoals(response);
      const todaysgoal = response.find((goal) => goal.date === fullDate);
      setTodaysGoal(todaysgoal);
    });
  };

  const addLike = (userUid: string): void => {
    addUidToLikes(todaysGoal!._id!, userUid).then(() => {
      getAndSetTodaysGoal(params);
    });
  };

  const unLike = (userUid: string): void => {
    takeOffUidFromLikes(todaysGoal!._id!, userUid).then(() =>
      getAndSetTodaysGoal(params)
    );
  };
  //get the current user and set their friends
  const getAndSetFriends = (userUid: string): void => {
    getUserByUid(userUid).then((response) => {
      console.log(response.friends);
      setFriends(response.friends);
    });
  };

  //add friend to the current user's friends and set thier friends
  const addFriend = (userUid: string, newFriend: Friend): void => {
    addNewFriend(userUid, newFriend).then(() => {
      getAndSetFriends(userUid);
    });
  };

  const removeFriend = (userUid: string, otherUserUid: string): void => {
    deleteFriend(userUid, otherUserUid).then(() => {
      getAndSetFriends(userUid);
    });
  };

  const isFriend = (otherUserUid: string): boolean => {
    return friends.some((friend) => friend.uid === otherUserUid);
  };

  useEffect(() => {
    if (user) {
      getAndSetFriends(user.uid);
    }
  }, [user]);

  useEffect(() => {
    getUserByUid(otherUserUid!).then((response) => {
      if (response) {
        setOtherUser(response);
        console.log(response);
      } else {
        navigate("/");
      }
    });
  }, [otherUserUid]);

  //useEffect the get params of type QueryStringParams which has other user's uid to use get goals by uid

  useEffect(() => {
    getAndSetTodaysGoal(params);
  }, []);

  return (
    <div className="OtherUserRoute">
      <div className="heading-icon">
        <h2>{otherUser && otherUser!.name.toLowerCase()}'s page</h2>
        {user && isFriend(otherUserUid!) ? (
          <i
            className="fa-solid fa-user"
            onClick={() => {
              removeFriend(user.uid, otherUserUid!);
            }}
          ></i>
        ) : (
          <i
            className="fa-regular fa-user"
            onClick={() => {
              addFriend(user!.uid, {
                uid: otherUserUid!,
                name: otherUser!.name,
              });
            }}
          ></i>
        )}
      </div>

      <h3>TODAY'S GOAL</h3>

      {todaysGoal ? (
        <TodaysCard
          todaysGoal={todaysGoal}
          onAddLike={addLike}
          onUnLike={unLike}
        />
      ) : (
        <p>NO TODAY'S GOAL YET!</p>
      )}

      <h3>PREVIOUS GOALS</h3>
      <div className="btns">
        <button
          className={`btn ${achieved ? "achieved" : "onAchieved"}`}
          onClick={() => setAchieved(true)}
        >
          ACHIEVED
        </button>

        <button
          className={`btn ${achieved ? "onMissed" : "missed"}`}
          onClick={() => setAchieved(false)}
        >
          MISSED
        </button>
      </div>
      <ul>
        {goals
          .filter((goal) => goal.completed === achieved && goal !== todaysGoal)
          .map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}
      </ul>
    </div>
  );
};

export default OtherUserRoute;
