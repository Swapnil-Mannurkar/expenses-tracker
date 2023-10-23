import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Form from "../UI/Form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginActions, loginThunk } from "@/store/loginSlice";
import CenterLayout from "../UI/CenterLayout";
import { isLoggedIn } from "@/store/store";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.loginSlice.status);

  const changeHandler = (value, field) => {
    if (field === "Username") {
      setUsername(value);
    } else if (field === "Password") {
      setPassword(value);
    }
  };

  const submitHandler = () => {
    const user = { username: username, password: password };
    dispatch(loginThunk(user));
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/dashboard");
    } else {
      localStorage.setItem("isLoggedIn", false);
    }
  }, [status]);

  useEffect(() => {
    dispatch(loginActions.resetStatus());
  }, [isLoggedIn]);

  return (
    <CenterLayout>
      <h1 className={styles.loginPageHeading}>Login</h1>
      <Form
        fields={{ Username: "text", Password: "password" }}
        button="login"
        onChange={changeHandler}
        onSubmit={submitHandler}
        values={{ username: username, password: password }}
      />
    </CenterLayout>
  );
};

export default Login;
