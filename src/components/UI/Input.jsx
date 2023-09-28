import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  let isPassword = props.type === "password";

  const changeHandler = (e) => {
    props.onChange(e.target.value, props.for);
  };

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
        required
      />
    </>
  );
};

export default Input;
