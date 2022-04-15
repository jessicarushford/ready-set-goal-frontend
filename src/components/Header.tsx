import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import logo from "../assets/logos/ready-set-goal-gray-logo.png";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import {
  addLastLogin,
  createNewUser,
  getUserByUid,
} from "../services/UserService";

const Header = () => {
  const { user } = useContext(AuthContext);
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  useEffect(() => {
    if (user) {
      getUserByUid(user.uid).then((response) => {
        if (!response) {
          createNewUser(user.uid, user.displayName!).then(() => {});
        }
      });
      addLastLogin(user.uid);
    }
  }, [user]);

  return (
    <header className="Header">
      <div className="logo-container">
        <Link to="/dashboard">
          <h1>
            <img src={logo} alt="Ready-Set-Goal" />
          </h1>
        </Link>
      </div>

      <div className="side-bar-container">
        <i className="fa-solid fa-bars"></i>
        <div className="side-bar-menu">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
