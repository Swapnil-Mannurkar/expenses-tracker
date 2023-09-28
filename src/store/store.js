import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";

const store = configureStore({ reducer: { signupSlice } });

export default store;
