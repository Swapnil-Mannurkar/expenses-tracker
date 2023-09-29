import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import Form from "@/components/UI/Form";
import { useDispatch, useSelector } from "react-redux";
import { signupActions, signupThunk } from "@/store/signupSlice";
import { useRouter } from "next/router";

const index = () => {
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const status = useSelector((state) => state.signupSlice.status);
  const dispatch = useDispatch();
  const router = useRouter();

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
    };
    dispatch(signupThunk(user));
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/dashboard");
    }
  }, [status]);

  useEffect(() => {
    dispatch(signupActions.resetStatus());
  }, []);

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
        onChange={changeHandler}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default index;
