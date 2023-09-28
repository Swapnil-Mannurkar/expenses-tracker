import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import Form from "@/components/UI/Form";
import { useDispatch } from "react-redux";
import { signupThunk } from "@/store/signupSlice";
import { useRouter } from "next/router";

const index = () => {
  const [fullName, setFullName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
        setUserName(value);
        return;
      case "Password":
        setPassword(value);
      default:
        return;
    }
  };

  const submitHandler = () => {
    const user = { fullname: fullName, username: userName, email, password };
    dispatch(signupThunk(user));
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      router.push("/dashboard");
    }
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
