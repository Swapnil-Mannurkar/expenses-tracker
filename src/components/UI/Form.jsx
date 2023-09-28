import React from "react";
import styles from "./Form.module.css";
import Input from "./Input";
import DarkButton from "./DarkButton";
import Link from "next/link";

const Form = (props) => {
  const fields = Object.entries(props.fields);

  const signup = (
    <Link href="/signup" style={{ color: "blue" }}>
      Signup
    </Link>
  );

  const login = (
    <Link href="/" style={{ color: "blue" }}>
      Login
    </Link>
  );

  return (
    <form className={styles.formContainer}>
      {fields.map((item) => (
        <div key={item[0]} className={styles.inputContainer}>
          <Input for={item[0]} type={item[1]} />
        </div>
      ))}
      <DarkButton title={props.button} />
      <p className={styles.redirectMessage}>
        {props.button === "login" ? "Don't" : "Already"} have an account?{" "}
        {props.button === "login" ? signup : login}
      </p>
    </form>
  );
};

export default Form;
