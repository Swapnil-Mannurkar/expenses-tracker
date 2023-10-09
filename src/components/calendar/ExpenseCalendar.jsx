import { getTransactionsThunk } from "@/store/getTransactionsSlice";
import { updateSharedVariable } from "@/store/store";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "@/store/store";
import ExpenseDetails from "./ExpenseDetails";
import Modal from "../UI/Modal";

function ExpenseCalendar() {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [isClickedOnDate, setIsClickedOnDate] = useState(false);
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
  };

  useEffect(() => {
    fetchTransactions();
  }, [isLoggedIn]);

  function tileContent({ date, view }) {
    if (view === "month") {
      const selectedDateUTC = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      try {
        const selectedDateString = selectedDateUTC.toISOString().split("T")[0];
        const filteredTransactions = transactions.filter(
          (item) => item[1].date === selectedDateString
        );

        const totalAmount = filteredTransactions.reduce(
          (accumulator, item) => accumulator + Number(item[1].amount),
          0
        );

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
      {isClickedOnDate && (
        <Modal closeModal={closeModal}>
          <ExpenseDetails date={date} />
        </Modal>
      )}
    </>
  );
}

export default ExpenseCalendar;
