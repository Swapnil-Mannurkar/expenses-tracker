import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import { useSelector } from "react-redux";

const Input = (props) => {
  const signupStatus = useSelector((state) => state.signupSlice.status);
  const loginStatus = useSelector((state) => state.loginSlice.status);
  const [displayUsernameError, setDisplayUsernameError] = useState(false);
  const [displayPasswordError, setDisplayPasswordError] = useState(false);
  const [displayEmailError, setDisplayEmailError] = useState(false);
  let isUsername = props.for === "Username";
  let isPassword = props.for === "Password";
  let isEmail = props.for === "Email";

  const changeHandler = (e) => {
    if (isUsername) setDisplayUsernameError(false);
    if (isPassword) setDisplayPasswordError(false);
    if (isEmail) setDisplayEmailError(false);
    props.onChange(e.target.value, props.for);
  };

  useEffect(() => {
    if (signupStatus === "User already exists!") {
      setDisplayUsernameError(true);
    } else if (signupStatus === "Email already exists!") {
      setDisplayEmailError(true);
    }
  }, [signupStatus]);

  useEffect(() => {
    if (loginStatus === "User not found!") {
      setDisplayUsernameError(true);
    } else if (loginStatus === "Incorrect password!") {
      setDisplayPasswordError(true);
    }
  }, [loginStatus]);

  useEffect(() => {
    if (loginStatus === "loading" || signupStatus === "loading") {
      setDisplayUsernameError(false);
      setDisplayPasswordError(false);
      setDisplayEmailError(false);
    }
  }, [loginStatus, signupStatus]);

  useEffect(() => {
    setDisplayUsernameError(false);
    setDisplayPasswordError(false);
    setDisplayEmailError(false);
  }, [props.formType]);

  return (
    <>
      <label className={styles.label} htmlFor={props.for}>
        {props.for}
      </label>

      <input
        type={props.type}
        className={styles.input}
        minLength={isPassword ? 8 : ""}
        style={{
          borderColor: isUsername
            ? displayUsernameError
              ? "red"
              : "black"
            : isPassword
            ? displayPasswordError
              ? "red"
              : "black"
            : isEmail && displayEmailError
            ? "red"
            : "black",
        }}
        onChange={changeHandler}
        required
      />

      {isUsername && displayUsernameError && (
        <p style={{ position: "absolute", marginTop: "56px", color: "red" }}>
          {props.formType === "login" ? loginStatus : signupStatus}
        </p>
      )}
      {isPassword && displayPasswordError && (
        <p style={{ position: "absolute", marginTop: "56px", color: "red" }}>
          {loginStatus}
        </p>
      )}
      {isEmail && displayEmailError && (
        <p style={{ position: "absolute", marginTop: "56px", color: "red" }}>
          {signupStatus}
        </p>
      )}
    </>
  );
};

export default Input;
