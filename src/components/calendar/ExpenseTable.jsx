import React from "react";
import styles from "./ExpenseTable.module.css";
import TableHr from "./TableHr";
import { MdDelete, MdEdit } from "react-icons/md";

const ExpenseTable = ({ transactions }) => {
  const onEditHandler = (item) => {
    console.log("Edit", item.title);
  };

  const onDeleteHandler = (item) => {
    console.log("delete", item.title);
  };

  return (
    <table className={styles.table}>
      <thead>
        <TableHr />
        <tr className={styles.headings}>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Modify</th>
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
              <td
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <MdEdit
                  onClick={() => onEditHandler(item)}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
                <MdDelete
                  onClick={() => onDeleteHandler(item)}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
              </td>
            </tr>
            <TableHr />
          </>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
