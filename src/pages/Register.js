import { useState } from "react";
import { register } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await register(email, password);
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-y-4 mt-5 py-4">
      <div>
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <div className="mt-1">
          <input
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 h-[40px] rounded-md"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 h-[40px] rounded-md"
            type="password"
            value={password}
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="px-4 py-2 border border-transparent disabled:opacity-40 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all w-full text-md font-semibold rounded-md" type="submit" disabled={!password || !email}>
        Register
      </button>
    </form>
  );
};

export default Register;
