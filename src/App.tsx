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

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/goals/details/:id" element={<DetailsRoute />} />
          <Route path="/users/:uid" element={<OtherUserRoute />} />
          <Route path="/users/me/:uid" element={<MeRoute />} />
          <Route path="/about-us" element={<AboutUsRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
