import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import { useSelector } from "react-redux";

const Input = (props) => {
  const signupStatus = useSelector((state) => state.signupSlice.status);
  const loginStatus = useSelector((state) => state.loginSlice.status);
  const [displayUsernameError, setDisplayUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [displayPasswordError, setDisplayPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  let isUsername = props.for === "Username";
  let isPassword = props.for === "Password";

  const changeHandler = (e) => {
    if (isUsername) setDisplayUsernameError(false);
    if (isPassword) setDisplayPasswordError(false);
    props.onChange(e.target.value, props.for);
  };

  useEffect(() => {
    if (signupStatus === "User already exists!") {
      setDisplayUsernameError(true);
      setUsernameErrorMessage(signupStatus);
    }
  }, [signupStatus]);

  useEffect(() => {
    if (loginStatus === "User not found!") {
      setDisplayUsernameError(true);
      setUsernameErrorMessage(loginStatus);
    } else if (loginStatus === "Incorrect password!") {
      setDisplayPasswordError(true);
      setPasswordErrorMessage(loginStatus);
    }
  }, [loginStatus]);

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
      {isUsername && displayUsernameError && (
        <p style={{ position: "absolute", marginTop: "56px", color: "red" }}>
          {usernameErrorMessage}
        </p>
      )}
      {isPassword && displayPasswordError && (
        <p style={{ position: "absolute", marginTop: "56px", color: "red" }}>
          {passwordErrorMessage}
        </p>
      )}
    </>
  );
};

export default Input;
