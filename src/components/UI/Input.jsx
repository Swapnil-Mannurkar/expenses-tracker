import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import { useSelector } from "react-redux";

const Input = (props) => {
  const status = useSelector((state) => state.signupSlice.status);
  const [displayError, setDisplayError] = useState(false);
  let isUsername = props.for === "Username";
  let isPassword = props.type === "password";

  const changeHandler = (e) => {
    if (isUsername) setDisplayError(false);
    props.onChange(e.target.value, props.for);
  };

  useEffect(() => {
    if (status === "User already exists!") {
      setDisplayError(true);
    }
  }, [status]);

  return (
    <>
      <label className={styles.label} htmlFor={props.for}>
        {props.for}
      </label>
      <input
        type={props.type}
        className={styles.input}
        minLength={isPassword ? 8 : ""}
        style={{ borderColor: "black" }}
        onChange={changeHandler}
      />
      {isUsername && displayError && (
        <p style={{ position: "absolute", marginTop: "56px", color: "red" }}>
          {status}
        </p>
      )}
    </>
  );
};

export default Input;
