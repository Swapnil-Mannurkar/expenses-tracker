import React, { useEffect } from "react";
import styles from "./ExpenseDetails.module.css";
import { getTransactionsByDateThunk } from "@/store/getTransactionsByDateSlice";
import { useDispatch } from "react-redux";

const ExpenseDetails = (props) => {
  const dispatch = useDispatch();
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

  return (
    <div className={styles.expenseDetailsContainer}>
      ExpenseDetails {fullDate}
    </div>
  );
};

export default ExpenseDetails;
