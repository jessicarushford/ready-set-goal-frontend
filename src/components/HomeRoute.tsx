import "./HomeRoute.css";
import { signInWithGoogle } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

// Login + Dashboard (Quote + Cards)
const HomeRoute = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div className="HomeRoute">
      <button onClick={signInWithGoogle}>LOGIN</button>
    </div>
  );
};

export default HomeRoute;
