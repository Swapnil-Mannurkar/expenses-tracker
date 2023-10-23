import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import Form from "@/components/UI/Form";
import { useDispatch } from "react-redux";
import { signupActions, signupThunk } from "@/store/signupSlice";
import Head from "next/head";
import CenterLayout from "../UI/CenterLayout";
import { isLoggedIn } from "@/store/store";

const Signup = () => {
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const changeHandler = (value, field) => {
    switch (field) {
      case "Full name":
        setFullName(value);
        return;
      case "Email":
        setEmail(value);
        return;
      case "Username":
        setUsername(value);
        return;
      case "Password":
        setPassword(value);
      default:
        return;
    }
  };

  const submitHandler = () => {
    const user = {
      fullname: fullName,
      username,
      email,
      password,
      transactions: "",
    };
    dispatch(signupThunk(user));
  };

  useEffect(() => {
    dispatch(signupActions.resetStatus());
  }, [isLoggedIn]);

  return (
    <CenterLayout>
      <h1 className={styles.signupPageHeading}>Signup</h1>
      <Form
        fields={{
          "Full name": "text",
          Email: "email",
          Username: "text",
          Password: "password",
        }}
        button="signup"
        onChange={changeHandler}
        onSubmit={submitHandler}
        values={{ username: username, password: password, fullname: fullName, email: email }}
      />
    </CenterLayout>
  );
};

export default Signup;
