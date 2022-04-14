import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Friend from "../models/Friend";
import {
  addNewFriend,
  deleteFriend,
  getUserByUid,
} from "../services/UserService";
import "./FriendRoute.css";

const FriendRoute = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState<Friend[]>();

  const getAndSetFriends = (userUid: string): void => {
    getUserByUid(userUid).then((response) => {
      console.log(response.friends);
      setFriends(response.friends);
    });
  };

  useEffect(() => {
    if (user) {
      getAndSetFriends(user.uid);
    }
  }, [user?.uid]);

  return (
    <div className="FriendRoute">
      {/* <h2>{user && `${user.displayName}`}'s friend list</h2> */}
      {/* {user && friends!.map((friend) => friend.name)} */}
    </div>
  );
};

export default FriendRoute;
