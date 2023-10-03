import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";
import addExpenseSlice from "./addExpenseSlice";
import getTransactionsSlice from "./getTransactionsSlice";

export let isLoggedIn = "";

export const updateSharedVariable = (value) => {
  isLoggedIn = localStorage.getItem("isLoggedIn");
};

const store = configureStore({
  reducer: { signupSlice, loginSlice, addExpenseSlice, getTransactionsSlice },
});

export default store;
