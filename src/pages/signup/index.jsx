import React from "react";
import styles from "./Signup.module.css";
import Form from "@/components/UI/Form";

const index = () => {
  return (
    <div className={styles.loginPageContainer}>
      <h1 className={styles.loginPageHeading}>Signup</h1>
      <Form
        fields={{
          "Full name": "text",
          Email: "email",
          Username: "text",
          Password: "password",
        }}
        button="signup"
      />
    </div>
  );
};

export default index;
