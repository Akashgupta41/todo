// store.js
import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slice/auth";
import userReducer from '../slice/auth'
export const store = configureStore({
  reducer: {
    // Add the register slice reducer here
    register: RegisterReducer,
    users:userReducer
  },
});
