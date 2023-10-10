import React, { useEffect, useState } from "react";
import styles from "./ExpenseDetails.module.css";
import { getTransactionsByDateThunk } from "@/store/getTransactionsByDateSlice";
import { useDispatch, useSelector } from "react-redux";
import CenterLayout from "../UI/CenterLayout";
import ExpenseTable from "./ExpenseTable";
import { MdAdd, MdAddAPhoto, MdAddCircle, MdClose } from "react-icons/md";
import { deleteTransactionThunk } from "@/store/deleteTransaction";
import Link from "next/link";
import { useRouter } from "next/router";

const ExpenseDetails = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const transactions = useSelector(
    (state) => state.getTransactionsByDateSlice.transactions
  );
  const status = useSelector((state) => state.deleteTransaction.status);
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
    if (status === "loading") {
      setIsLoading(true);
    }
    setTimeout(() => setIsLoading(false), 2000);
  }, [status]);

  const closeModal = () => {
    props.closeModal();
  };

  const onDeleteHandler = ({ title, date }) => {
    dispatch(deleteTransactionThunk({ title, date }));
  };

  const onEditHandler = ({ title, amount, date }) => {
    router.push({ pathname: "/add-expense", query: { title, amount, date } });
  };

  return (
    <div className={styles.expenseDetailsContainer}>
      <MdClose className={styles.closeBtn} onClick={closeModal} />

      {isLoading && (
        <CenterLayout>
          <h1>Loading...</h1>
        </CenterLayout>
      )}
      {isTransactionNull && !isLoading && (
        <CenterLayout>
          <h2 className={styles.expenseDetailsHeading}>Expense Details</h2>
          <ExpenseTable
            transactions={transactions}
            deleteHandler={onDeleteHandler}
            editHandler={onEditHandler}
          />
        </CenterLayout>
      )}
      {!isTransactionNull && !isLoading && (
        <CenterLayout>
          <h1>No expenses!</h1>
          <Link href="/add-expense" style={{ color: "blue" }}>
            <MdAddCircle style={{ fontSize: "14px" }} /> Add expense
          </Link>
        </CenterLayout>
      )}
    </div>
  );
};

export default ExpenseDetails;
