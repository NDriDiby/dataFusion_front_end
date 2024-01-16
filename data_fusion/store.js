// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice"; // Import your reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // use the authReducer
  },
  // Redux Toolkit includes redux-thunk by default, so you don't need to explicitly add it
});

export default store;
