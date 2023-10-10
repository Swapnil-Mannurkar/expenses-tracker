import { getTransactionsThunk } from "@/store/getTransactionsSlice";
import { updateSharedVariable } from "@/store/store";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "@/store/store";
import ExpenseDetails from "./ExpenseDetails";
import Modal from "../UI/Modal";
import { getTransactionsByDateActions } from "@/store/getTransactionsByDateSlice";

function ExpenseCalendar() {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [isClickedOnDate, setIsClickedOnDate] = useState(false);
  const status = useSelector((state) => state.deleteTransaction.status);
  const dispatch = useDispatch();

  updateSharedVariable(localStorage.getItem("isLoggedIn"));

  const fetchTransactions = async () => {
    const response = await dispatch(getTransactionsThunk());
    setTransactions(await response.payload);
  };

  const clickedOnDate = (date) => {
    setDate(date);
    setIsClickedOnDate(true);
  };

  const closeModal = () => {
    setIsClickedOnDate(false);
    dispatch(getTransactionsByDateActions.reset());
  };

  useEffect(() => {
    fetchTransactions();
  }, [isLoggedIn, status]);

  function tileContent({ date, view }) {
    if (view === "month") {
      const selectedDateUTC = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      try {
        const selectedDateString = selectedDateUTC.toISOString().split("T")[0];

        let filteredTransactions = transactions.filter(
          (item) => item[0] === selectedDateString
        );

        filteredTransactions = filteredTransactions.map((item) => {
          return Object.entries(item[1]);
        });

        let totalAmount = 0;

        filteredTransactions.map((items) => {
          items.map(
            (item) => (totalAmount = totalAmount + Number(item[1].amount))
          );
        });

        return `₹ ${totalAmount}`;
      } catch (error) {
        return `₹ 0`;
      }
    }
  }

  return (
    <>
      <Calendar
        value={date}
        onChange={(date) => {
          clickedOnDate(date);
        }}
        tileContent={tileContent}
      />
      <div>
        {isClickedOnDate && (
          <Modal closeModal={closeModal}>
            <ExpenseDetails date={date} closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default ExpenseCalendar;
