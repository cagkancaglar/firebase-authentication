import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../firebase"
import { logout as logoutHandle } from "../store/auth"

const Home = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true
    })
  }



 const {user} = useSelector(state => state.auth)

 if (user){
  return (
    <div className="max-w-xl mx-auto py-5 flex justify-center">
      <h1 className="flex gap-x-4 items-center">Logged in {user.email}
      <button onClick={handleLogout} className="h-8 text-sm px-3 bg-indigo-500 rounded text-white">Logout</button>
      </h1>
    </div>
  )
 }

  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Home;
