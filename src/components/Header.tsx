import { Link, useParams } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import logo from "../assets/logos/ready-set-goal-gray-logo.png";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  // const { uid } = useParams();
  return (
    <header className="Header">
      <div className="logo-container">
        <Link to="/dashboard">
          <h1>
            <img src={logo} alt="Ready-Set-Goal" />
          </h1>
        </Link>
        <a href="side-bar-icon">
          <i className="fa-solid fa-bars"></i>
        </a>
      </div>

      <div className="side-bar-container">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">DASHBOARD</Link>
            </li>
            {user && (
              <div>
                <li>
                  <Link to={`/users/me/${encodeURIComponent(user!.uid)}`}>
                    TODAY'S GOAL
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/users/me/previous/${encodeURIComponent(user!.uid)}`}
                  >
                    PREVIOUS GOALS
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/users/me/summary/${encodeURIComponent(user!.uid)}`}
                  >
                    GOAL SUMMARY
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/users/me/friends/${encodeURIComponent(user!.uid)}`}
                  >
                    FRIENDS
                  </Link>
                </li>
              </div>
            )}

            <li>
              <Link to="/about-us">ABOUT US</Link>
            </li>
            {user ? (
              <li>
                <Link onClick={signOut} to="/">
                  LOG OUT
                </Link>
              </li>
            ) : (
              <li>
                <Link onClick={signInWithGoogle} to="/">
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* <button>My Goals</button>
        <button>Previous Goals</button>
        <button onClick={signInWithGoogle}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
        <button>Friends</button> */}
      </div>
    </header>
  );
};

export default Header;
