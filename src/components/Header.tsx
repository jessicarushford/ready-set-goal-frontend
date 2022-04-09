import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import logo from "../assets/logos/ready-set-goal-logo-gray.png";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/dashboard">
        <h1>
          <img src={logo} alt="Ready-Set-Goal" />
        </h1>
      </Link>

      <div>
        <button>My Goals</button>
        <button>Previous Goals</button>
        <button onClick={signInWithGoogle}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
        <button>Friends</button>
      </div>
    </header>
  );
};

export default Header;
