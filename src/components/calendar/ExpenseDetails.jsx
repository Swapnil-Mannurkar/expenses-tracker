import React, { useEffect, useState } from "react";
import styles from "./ExpenseDetails.module.css";
import { getTransactionsByDateThunk } from "@/store/getTransactionsByDateSlice";
import { useDispatch, useSelector } from "react-redux";
import CenterLayout from "../UI/CenterLayout";
import ExpenseTable from "./ExpenseTable";

const ExpenseDetails = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.getTransactionsByDateSlice.transactions
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionNull, setIsTransactionNull] = useState(true);
  useEffect(() => {
    if (transactions.length === 0) {
      setIsTransactionNull(false);
    } else {
      setIsTransactionNull(true);
    }
  }, [transactions]);

  let date = props.date.getDate();
  const month = props.date.getMonth() + 1;
  const year = props.date.getFullYear();
  if (String(date).length === 1) {
    date = "0" + date;
  }
  const fullDate = year + "-" + month + "-" + date;

  useEffect(() => {
    dispatch(getTransactionsByDateThunk(fullDate));
  }, []);

  setTimeout(() => setIsLoading(false), 2000);

  return (
    <div className={styles.expenseDetailsContainer}>
      {isLoading && (
        <CenterLayout>
          <h1>Loading...</h1>
        </CenterLayout>
      )}
      {isTransactionNull && !isLoading && (
        <CenterLayout>
          <h2 className={styles.expenseDetailsHeading}>Expense Details</h2>
          <ExpenseTable transactions={transactions} />
        </CenterLayout>
      )}
      {!isTransactionNull && !isLoading && (
        <CenterLayout>
          <h1>No expenses!</h1>
        </CenterLayout>
      )}
    </div>
  );
};

export default ExpenseDetails;
