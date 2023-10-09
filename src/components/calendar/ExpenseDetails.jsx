import React from "react";
import styles from "./ExpenseDetails.module.css";

const ExpenseDetails = (props) => {
  let date = props.date.getDate();
  const month = props.date.getMonth() + 1;
  const year = props.date.getFullYear();
  if (String(date).length === 1) {
    date = "0" + date;
  }
  const fullDate = year + "-" + month + "-" + date;

  return <div className={styles.expenseDetailsContainer}>ExpenseDetails</div>;
};

export default ExpenseDetails;
