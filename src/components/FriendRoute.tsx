import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Friend from "../models/Friend";
import { addNewFriend, deleteFriend } from "../services/UserService";
import "./FriendRoute.css";

const FriendRoute = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState<Friend>();

  // const addFriend = (uid: string): void => {
  //   addNewFriend(uid).then((response) => setFriends(response.friend));
  // };

  // const removeFriend = (uid: string): void => {
  //   deleteFriend(uid).then(() => {
  //     setFriends(friends);
  //   });
  // };

  // const isFriend = (uid: string): boolean =>
  //   friends.some((friend) => friend.uid === uid);

  return (
    <div className="FriendRoute">
      <h2>{user?.displayName?.toLowerCase()}'s friend list</h2>
    </div>
  );
};

export default FriendRoute;
