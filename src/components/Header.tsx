import { Link, useLocation } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import logo from "../assets/logos/ready-set-goal-gray-logo.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  addLastLogin,
  createNewUser,
  getUserByUid,
} from "../services/UserService";
import QueryStringParams from "../models/QueryStringParams";
import { getGoalById, getGoals } from "../services/GoalsService";
import Goal from "../models/Goal";

const Header = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const { user } = useContext(AuthContext);
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const location = useLocation();
  const path = location.pathname;
  const todaysDate = `${month}.${day}.${year}`;
  const params: QueryStringParams = {
    uid: user?.uid,
  };

  const addLastLoginAndRemovePopUp = (uid: string): void => {
    addLastLogin(uid);
    setIsActive(false);
  };

  useEffect(() => {
    if (user) {
      getUserByUid(user.uid).then((response) => {
        if (!response) {
          createNewUser(user.uid, user.displayName!).then(() => {});
        } else {
          if (response.lastLogin !== todaysDate) {
            console.log(response.lastLogin);
            getGoals(params).then((response) => setGoals(response));
            setIsActive(true);
            setShowPopUp(true);
            console.log(showPopUp);
          }
        }
      });
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
      </div>
      <div className="pop-up-container">
        {showPopUp && goals.length ? (
          <>
            {goals[goals.length - 1].completed && (
              <div className={!isActive ? "hide" : ""}>
                <i
                  className="fa-solid fa-x"
                  onClick={() => addLastLoginAndRemovePopUp(user?.uid!)}
                ></i>
                <p className="greeting-p">congrats!</p>
                <p className="pop-up-p">You completed your last goal!</p>
                <Link to={`/users/me/${user?.uid}`}>
                  <button
                    className="pop-up-btn"
                    onClick={() => addLastLoginAndRemovePopUp(user?.uid!)}
                  >
                    LET'S GO!
                  </button>
                </Link>
              </div>
            )}
            {!goals[goals.length - 1].completed && (
              <div className={!isActive ? "hide" : ""}>
                <i
                  className="fa-solid fa-x"
                  onClick={() => addLastLoginAndRemovePopUp(user?.uid!)}
                ></i>
                <p className="greeting-p">oh no!</p>
                <p className="pop-up-p">
                  You missed your last goal! Do you want to re-set it to your
                  Today's Goal?
                </p>
                <Link to={`/users/me/${user?.uid}`}>
                  <button
                    className="pop-up-btn"
                    onClick={() => addLastLoginAndRemovePopUp(user?.uid!)}
                  >
                    YES, PLEASE!
                  </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className={!isActive ? "hide" : ""}>
            <Link to="/dashboard">
              <i
                className="fa-solid fa-x"
                onClick={() => addLastLoginAndRemovePopUp(user?.uid!)}
              ></i>
            </Link>
            <p className="greeting-p">welcome!</p>
            <p className="pop-up-p">
              We are so excited for you to join ready, set, goal!
            </p>
            <Link to={`/users/me/${user?.uid}`}>
              <button
                className="pop-up-btn"
                onClick={() => addLastLoginAndRemovePopUp(user?.uid!)}
              >
                LET'S GET STARTED!
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
