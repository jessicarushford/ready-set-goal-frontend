import { Link, useLocation } from "react-router-dom";
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
import QueryStringParams from "../models/QueryStringParams";
import { getGoalById, getGoals } from "../services/GoalsService";

const Header = () => {
  const { user } = useContext(AuthContext);
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const location = useLocation();
  const path = location.pathname;
  const lastLoginDate = `${month}.${day}.${year}`;
  const params: QueryStringParams = {
    uid: user?.uid,
  };

  //for notification only once, check if user signed in already for today or not.
  //true : false not neccessary?
  const isLastLoginToday = (uid: string): void => {
    getUserByUid(uid).then((response) => {
      if (response.lastLogin) {
        return response.lastLogin === lastLoginDate ? true : false;
      }
    });
  };

  //check if they have a goal. we'll check the last login, so we don't need to check if the goal is today's goal or not. it should be always past goal as long as the isLastLogin is truthy.
  const isPastGoal = (params: QueryStringParams): void => {
    getGoals(params).then((response) => (response ? true : false));
  };

  //what if they visited the website yesterday and didn't make a goal and then try to go to the website today?
  //still you can see the pop up?? maybe yes
  //the goal they made last time is not always yesterday goal

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
    <header className={`Header${path === "/" ? " hide" : ""}`}>
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
        {/* {user && !isLastLoginToday && isPastGoal(params) ? (
          <>
            <div>
              <p>
                You missed your last goal! Do you want to re-set it to your
                Today's Goal?
              </p>
              <Link to={`/users/me/${user!.uid}`}>
                <p>YES PLEASE</p>
              </Link>
            </div>
            <div>
              <p>Congrats! You completed your last goal!</p>
              <Link to={`/users/me/${user!.uid}`}>
                <p>LET'S GO!</p>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )} */}
      </div>
    </header>
  );
};

export default Header;
