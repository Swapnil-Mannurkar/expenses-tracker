import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import ExpenseCalendar from "@/components/calendar/ExpenseCalendar";
import "react-calendar/dist/Calendar.css";

const index = () => {
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <div className={styles.calendarContainer}>
        <ExpenseCalendar />
      </div>
    </>
  );
};

export default index;
