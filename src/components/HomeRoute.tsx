import "./HomeRoute.css";
import { signInWithGoogle } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

// Login + Dashboard (Quote + Cards)
const HomeRoute = () => {
  const navigate = useNavigate();

  // const dashboardLink = ():void => {
  //   signInWithGoogle().then(()=> {
  //     navigate("/dashboard")
  //   });
  // };

  return (
    <div className="HomeRoute">
      {/* <button onClick={dashboardLink}>LOGIN</button> */}
    </div>
  );
};

export default HomeRoute;
