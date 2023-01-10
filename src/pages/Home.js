import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import Update from "../components/Update";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {

    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center justify-center text-md font-semibold">
          Logged in {user.email}
          <button
            onClick={handleLogout}
            className="h-8 text-sm px-3 bg-indigo-500 rounded text-white"
          >
            Logout
          </button>
        </h1>
        <Update />
      </div>
    );
  }

  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Home;
