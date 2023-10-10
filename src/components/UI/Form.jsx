import React from "react";
import styles from "./Form.module.css";
import Input from "./Input";
import DarkButton from "./DarkButton";
import Link from "next/link";
import { useSelector } from "react-redux";

const Form = (props) => {
  const signupStatus = useSelector((state) => state.signupSlice.status);
  const loginStatus = useSelector((state) => state.loginSlice.status);
  const fields = Object.entries(props.fields);
  const isLoading = signupStatus === "loading" || loginStatus === "loading";

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
          <Input
            title={item[0]}
            value={
              item[0] === "Title"
                ? props.values.title
                : item[0] === "Amount"
                ? props.values.amount
                : item[0] === "Date"
                ? props.values.date
                : ""
            }
            type={item[1]}
            onChange={changeHandler}
            formType={props.button}
          />
        </div>
      ))}
      <DarkButton title={isLoading ? "Loading...." : props.button} />
      {(props.button === "login" || props.button === "signup") && (
        <p className={styles.redirectMessage}>
          {props.button === "login" ? "Don't" : "Already"} have an account?{" "}
          {link}
        </p>
      )}
    </form>
  );
};

export default Form;
