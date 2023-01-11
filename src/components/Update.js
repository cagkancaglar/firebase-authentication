import { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login as handleLogin } from "../store/auth";

const Update = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (displayName === "") {
    //   toast.error("Invalid value!");
    // } else {
    //   if (displayName === auth.currentUser.displayName) {
    //     toast.error(`Already your name is "${displayName}"`);
    //   } else {
    //     await update({
    //       displayName,
    //       photoURL: avatar
    //     });
    //     dispatch(handleLogin(auth.currentUser));
    //   }
    // }

    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      handleLogin({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        eMailVerifiedi: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uuid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const result = await resetPassword(password);
    if(result){
        setPassword("");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <label className="font-semibold mt-5 text-lg">Update Profile</label>
        <div>
          <label className="block text-sm font-medium text-gray-500">
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
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Photo
          </label>
          <div className="mt-1">
            <input
              className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 h-[40px] rounded-md"
              type="text"
              value={avatar}
              placeholder="Photo URL"
              onChange={(e) => setAvatar(e.target.value)}
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

      <form onSubmit={handleResetSubmit} className="grid gap-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Change Password
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
        <button
          className="px-4 py-2 border border-transparent disabled:opacity-40 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all w-full text-md font-semibold rounded-md"
          type="submit"
          disabled={!password}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Update;
