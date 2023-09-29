// Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";

function ExpenseCalendar() {
  const [date, setDate] = useState(new Date());

  function tileContent({ date, view }) {
    if (view === "month") {
      // const today = new Date();
      // if (
      //   date.getDate() === today.getDate() &&
      //   date.getMonth() === today.getMonth() &&
      //   date.getFullYear() === today.getFullYear()
      // ) {
      //   return "Today";
      // }
      // You can add data to specific dates here.
      // For example, you can fetch data from an API or use local data.
      // For simplicity, let's just add some static data to a specific date:
      // if (
      //   date.getDate() === 15 &&
      //   date.getMonth() === 8 &&
      //   date.getFullYear() === 2023
      // ) {
      //   return "Special Event";
      // }
      return "₹ 0";
    }
  }

  return <Calendar value={date} onChange={setDate} tileContent={tileContent} />;
}

export default ExpenseCalendar;
