import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import ExpenseCalendar from "@/components/calendar/ExpenseCalendar";
import "react-calendar/dist/Calendar.css";
import CenterLayout from "@/components/UI/CenterLayout";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
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
      <div className={styles.main}>
        <CenterLayout>
          {isLoading ? (
            <p style={{ fontSize: "2rem" }}>Loading....</p>
          ) : (
            <ExpenseCalendar />
          )}
        </CenterLayout>
      </div>
    </>
  );
};

export default index;
