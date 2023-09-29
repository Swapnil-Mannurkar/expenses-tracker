import React, { useEffect } from "react";
import styles from "./Signup.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Signup from "@/components/signup/Signup";

const index = () => {
  const status = useSelector((state) => state.signupSlice.status);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/dashboard");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <main className={styles.main}>
        <Signup />
      </main>
    </>
  );
};

export default index;
