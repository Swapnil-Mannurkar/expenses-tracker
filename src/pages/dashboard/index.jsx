import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/");
    }
  }, []);

  return <div>index</div>;
};

export default index;
