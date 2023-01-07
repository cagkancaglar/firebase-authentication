import { Link } from "react-router-dom";

const Home = () => {
  
  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Home;
