import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginActions } from "@/store/loginSlice";
import Head from "next/head";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(loginActions.logout());
    router.push("/");
  };

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
        <p>Dashboard</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default index;
