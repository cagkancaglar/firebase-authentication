import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal"

const store = configureStore({
  reducer: {
    auth,
    modal
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
