import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Friend from "../models/Friend";
import { deleteFriend, getUserByUid } from "../services/UserService";
import "./FriendRoute.css";

const FriendRoute = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState<Friend[]>([]);

  const getAndSetFriends = (userUid: string): void => {
    getUserByUid(userUid).then((response) => {
      console.log(response.friends);
      setFriends(response.friends);
    });
  };

  const removeFriend = (userUid: string, otherUserUid: string): void => {
    deleteFriend(userUid, otherUserUid).then(() => {
      getAndSetFriends(userUid);
    });
  };

  useEffect(() => {
    if (user) {
      getAndSetFriends(user.uid);
    }
  }, [user]);

  return (
    <div className="FriendRoute">
      <h2>{user && `${user.displayName?.toLowerCase()}`}'s friend list</h2>
      <ul>
        {friends.map((friend) => (
          <li>
            {friend.name}
            <i
              className="fa-solid fa-user"
              onClick={() => {
                removeFriend(user!.uid, friend.uid!);
              }}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRoute;
