import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";
import addExpenseSlice from "./addExpenseSlice";
import { configureStore } from "@reduxjs/toolkit";
import deleteTransaction from "./deleteTransaction";
import updateExpenseSlice from "./updateExpenseSlice";
import getTransactionsSlice from "./getTransactionsSlice";
import getTransactionsByDateSlice from "./getTransactionsByDateSlice";

export let isLoggedIn = "";

export const updateSharedVariable = (value) => {
  isLoggedIn = localStorage.getItem("isLoggedIn");
};

const store = configureStore({
  reducer: {
    loginSlice,
    signupSlice,
    addExpenseSlice,
    deleteTransaction,
    updateExpenseSlice,
    getTransactionsSlice,
    getTransactionsByDateSlice,
  },
});

export default store;
