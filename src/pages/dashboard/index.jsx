import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import ExpenseCalendar from "@/components/calendar/ExpenseCalendar";
import "react-calendar/dist/Calendar.css";

const index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      router.push("/");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <div className={styles.calendarContainer}>
        {isLoading ? (
          <p style={{ fontSize: "2rem" }}>Loading....</p>
        ) : (
          <ExpenseCalendar />
        )}
      </div>
    </>
  );
};

export default index;
