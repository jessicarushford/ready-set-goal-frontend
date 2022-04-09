import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import logo from "../assets/logos/ready-set-goal-gray-logo.png";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

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
              <a href="">DASHBOARD</a>
            </li>
            <li>
              <a href="">TODAY'S GOAL</a>
            </li>
            <li>
              <a href="">PREVIOUS GOALS</a>
            </li>
            <li>
              <a href="">GOAL SUMMARY</a>
            </li>
            <li>
              <a href="">FRIENDS</a>
            </li>
            <li>
              <a href="">ABOUT US</a>
            </li>
            {user ? (
              <li>
                <a onClick={signOut} href="">
                  LOG OUT
                </a>
              </li>
            ) : (
              <li>
                <a onClick={signInWithGoogle} href="">
                  LOG IN
                </a>
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
