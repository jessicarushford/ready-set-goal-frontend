import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./FriendRoute.css";

const FriendRoute = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState();

  return (
    <div className="FriendRoute">
      <h2>{user?.displayName?.toLowerCase()}'s friend list</h2>
    </div>
  );
};

export default FriendRoute;
