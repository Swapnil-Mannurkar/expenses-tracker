import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  let isTrue = props.type === "password";

  return (
    <>
      <label className={styles.label} htmlFor={props.for}>
        {props.for}
      </label>
      <input
        type={props.type}
        className={styles.input}
        minLength={isTrue ? 8 : ""}
        style={{ borderColor: "black" }}
        required
      />
    </>
  );
};

export default Input;
