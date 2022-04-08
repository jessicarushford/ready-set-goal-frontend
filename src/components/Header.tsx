import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <h1>Ready, Set, Goal</h1>
      <Link to="/"></Link>
      <div>
        <Link to="">
          <button>My Goals</button>
        </Link>
        <button>Previous Goals</button>
        <button onClick={signInWithGoogle}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
        <Link to="">
          <button>Friends</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
