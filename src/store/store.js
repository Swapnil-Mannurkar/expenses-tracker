import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";
import addExpenseSlice from "./addExpenseSlice";
import getTransactionsSlice from "./getTransactionsSlice";

const store = configureStore({
  reducer: { signupSlice, loginSlice, addExpenseSlice, getTransactionsSlice },
});

export default store;
