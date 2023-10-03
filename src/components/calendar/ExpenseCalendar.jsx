// Calendar.js
import { getTransactionsThunk } from "@/store/getTransactionsSlice";
import { updateSharedVariable } from "@/store/store";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "@/store/store";

function ExpenseCalendar() {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  updateSharedVariable(localStorage.getItem("isLoggedIn"));

  const fetchTransactions = async () => {
    const response = await dispatch(getTransactionsThunk());
    setTransactions(await response.payload);
  };

  useEffect(() => {
    fetchTransactions();
  }, [isLoggedIn]);

  function tileContent({ date, view }) {
    if (view === "month") {
      const selectedDateUTC = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      const selectedDateString = selectedDateUTC.toISOString().split("T")[0];
      const filteredTransactions = transactions.filter(
        (item) => item[1].date === selectedDateString
      );

      const totalAmount = filteredTransactions.reduce(
        (accumulator, item) => accumulator + Number(item[1].amount),
        0
      );

      return `₹ ${totalAmount}`;
    }
  }

  return <Calendar value={date} onChange={setDate} tileContent={tileContent} />;
}

export default ExpenseCalendar;
