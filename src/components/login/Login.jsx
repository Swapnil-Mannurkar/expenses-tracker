import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Form from "../UI/Form";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const changeHandler = (value, field) => {
    if (field === "Username") {
      setUsername(value);
    } else if (field === "Password") {
      setPassword(value);
    }
  };

  const submitHandler = () => {
    const user = { username: username, password: password };
    console.log("login submit handler");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className={styles.loginPageContainer}>
      <h1 className={styles.loginPageHeading}>Login</h1>
      <Form
        fields={{ Username: "text", Password: "password" }}
        button="login"
        onChange={changeHandler}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default Login;
