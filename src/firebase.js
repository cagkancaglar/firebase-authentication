// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
import store from "./store";
import { openModal } from "./store/modal"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        eMailVerifiedi: user.emailVerified,
        photoURL: user.photoURL,
        uuid: user.uid,
      })
    );
  } else {
    store.dispatch(logoutHandle());
  }
});

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile Updated");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const eMailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Verification mail has been sent to ${auth.currentUser.email} please check`
    );
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Your password has been updated.");
    return true;
  } catch (error) {
    if(error.code === "auth/requires-recent-login"){
      store.dispatch(openModal({
        name: "re-auth-modal"
      }))
    }
    toast.error(error.message);
  }
};

export default app;
