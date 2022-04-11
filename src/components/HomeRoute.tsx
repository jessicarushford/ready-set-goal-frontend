import "./HomeRoute.css";
import { signInWithGoogle } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

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
      <p>
        Continue as{" "}
        <Link to={`/dashboard`} className="guest btn">
          Guest
        </Link>
      </p>
    </div>
  );
};

export default HomeRoute;
