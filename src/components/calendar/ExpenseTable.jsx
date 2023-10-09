import React from "react";
import styles from "./ExpenseTable.module.css";
import TableHr from "./TableHr";

const ExpenseTable = ({ transactions }) => {
  return (
    <table className={styles.table}>
      <thead>
        <TableHr />
        <tr className={styles.headings}>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
        </tr>
        <TableHr />
      </thead>
      <tbody>
        {transactions.map((item) => (
          <>
            <tr key={item.title}>
              <td>{item.date}</td>
              <td>{item.title}</td>
              <td>{item.amount}</td>
            </tr>
            <TableHr />
          </>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
