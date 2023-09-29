import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

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
      <div>
        <Navbar />
      </div>
    </>
  );
};

export default index;
