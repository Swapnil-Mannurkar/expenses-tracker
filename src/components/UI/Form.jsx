import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "./Input";
import DarkButton from "./DarkButton";
import Link from "next/link";

const Form = (props) => {
  const fields = Object.entries(props.fields);

  const changeHandler = (value, field) => {
    props.onChange(value, field);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  const link =
    props.button === "login" ? (
      <Link href="/signup" style={{ color: "blue" }}>
        Signup
      </Link>
    ) : (
      <Link href="/" style={{ color: "blue" }}>
        Login
      </Link>
    );

  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      {fields.map((item) => (
        <div key={item[0]} className={styles.inputContainer}>
          <Input for={item[0]} type={item[1]} onChange={changeHandler} />
        </div>
      ))}
      <DarkButton title={props.button} />
      <p className={styles.redirectMessage}>
        {props.button === "login" ? "Don't" : "Already"} have an account? {link}
      </p>
    </form>
  );
};

export default Form;
