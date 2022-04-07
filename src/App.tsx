import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Main />} />
//           <Route path="/gifs/search" element={<Main />} />
//           <Route path="/gifs/:id/details" element={<Details />} />
//           <Route path="/gifs/favorites" element={<Favorites />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
