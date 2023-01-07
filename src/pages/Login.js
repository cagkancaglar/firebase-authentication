import { useState } from "react";
import { login } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password);
    console.log(user);
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto  grid gap-y-4 mt-5">
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <div className="mt-1">
          <input
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 h-[40px] rounded-md"
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 h-[40px] rounded-md"
            type="password"
            value={password}
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="px-4 py-2 border border-transparent hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full text-md font-semibold rounded-md cursor-pointer"
            type="submit"
            disabled={!password || !email}
          >
            Login
          </button>
        </div>
        <div>{email}</div>
        <div>{password}</div>
      </form>
    </div>
  );
};

export default Login;
