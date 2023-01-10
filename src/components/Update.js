import { useState } from "react";
import { update, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login as handleLogin } from "../store/auth";
import { toast } from "react-hot-toast";

const Update = () => {
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  //   const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   if(displayName === ""){
    toast.error("empty value!")
   } else{
    if(displayName === auth.currentUser.displayName){
        toast.error(`Already your name is "${displayName}"`)
    } else{
        await update({
            displayName
        })
        dispatch(handleLogin(auth.currentUser))
    }
   }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-4">
      <h1 className="font-semibold mt-5 text-lg">Update Profile</h1>
      <div>
        <label htmlFor="" className="block text-sm font-medium text-gray-500">
          Name
        </label>
        <div className="mt-1">
          <input
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 h-[40px] rounded-md"
            type="text"
            value={displayName}
            placeholder="John Doe"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
      </div>
      <button
        className="px-4 py-2 border border-transparent disabled:opacity-40 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all w-full text-md font-semibold rounded-md"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default Update;
