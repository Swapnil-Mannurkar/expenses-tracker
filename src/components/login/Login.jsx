import React from "react";
import styles from "./Login.module.css";
import Form from "../UI/Form";

const Login = () => {
  return (
    <div className={styles.loginPageContainer}>
      <h1 className={styles.loginPageHeading}>Login</h1>
      <Form
        fields={{ Username: "text", Password: "password" }}
        button="login"
      />
    </div>
  );
};

export default Login;
