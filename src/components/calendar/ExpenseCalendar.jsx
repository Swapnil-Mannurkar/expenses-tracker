// Calendar.js
import { getTransactionsThunk } from "@/store/getTransactionsSlice";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";

function ExpenseCalendar() {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const fetchTransactions = async () => {
    const response = await dispatch(getTransactionsThunk());
    setTransactions(await response.payload);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  function tileContent({ date, view }) {
    if (view === "month") {
      const selectedDate = date.toISOString().split("T")[0];
      const filteredTransactions = transactions.filter(
        (item) => item[1].date === selectedDate
      );

      const totalAmount = filteredTransactions.reduce(
        (accumulator, item) => accumulator + Number(item[1].amount),
        0
      );

      return `₹ ${totalAmount}`;
    }

    return null;
  }

  return <Calendar value={date} onChange={setDate} tileContent={tileContent} />;
}

export default ExpenseCalendar;
