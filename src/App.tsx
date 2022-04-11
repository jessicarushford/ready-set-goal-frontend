import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import HomeRoute from "./components/HomeRoute";
import DetailsRoute from "./components/DetailsRoute";
import OtherUserRoute from "./components/OtherUserRoute";
import MeRoute from "./components/MeRoute";
import AboutUsRoute from "./components/AboutUsRoute";
import DashboardRoute from "./components/DashboardRoute";
import PreviousGoalsRoute from "./components/PreviousGoalsRoute";
import SummaryRoute from "./components/SummaryRoute";
import FriendRoute from "./components/FriendRoute";
import TodaysCard from "./components/TodaysCard";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/goals/details/:id" element={<DetailsRoute />} />
          <Route path="/users/:uid" element={<OtherUserRoute />} />
          <Route path="/users/me/:uid" element={<MeRoute />} />
          {/* <Route path="/users/me/todays-goal/:uid" element={<TodaysCard />} /> */}
          <Route
            path="/users/me/previous/:uid"
            element={<PreviousGoalsRoute />}
          />
          <Route path="/users/me/summary/:uid" element={<SummaryRoute />} />
          <Route path="/users/me/friends/:uid" element={<FriendRoute />} />
          <Route path="/about-us" element={<AboutUsRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
