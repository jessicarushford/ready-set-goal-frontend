import "./HomeRoute.css";
import { signInWithGoogle } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import grayLogo from "../assets/logos/ready-set-goal-gray-logo.png";

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
      <img src={grayLogo} alt="Logo" />
      <div className="welcome">
        <p>Keep your motivation</p>
        <p>with simple, daily goals.</p>
        <p>We are always rooting</p>
        <p>for you.</p>
      </div>

      <button className="login-btn" onClick={signInWithGoogle}>
        LOGIN
      </button>
      <p>
        Continue as{" "}
        <Link to={`/dashboard`} className="guest-btn">
          Guest
        </Link>
      </p>
      <p className="footer-p">
        By continuing, I accept the ready, set, goal Terms and Conditions of Use
        and Privacy Policy. Established © 2022
      </p>
    </div>
  );
};

export default HomeRoute;
