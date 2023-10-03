import React, { useEffect, useState } from "react";
import styles from "./AddExpense.module.css";
import Navbar from "@/components/navbar/Navbar";
import Form from "@/components/UI/Form";
import CenterLayout from "@/components/UI/CenterLayout";
import { addExpenseThunk } from "@/store/addExpenseSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/store/store";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const changeHandler = (value, field) => {
    if (field === "Title") {
      setTitle(value);
    } else if (field === "Amount") {
      setAmount(value);
    } else if (field === "Date") {
      setDate(value);
    }
  };

  const submitHandler = () => {
    const expenseDetails = { title, amount, date };
    dispatch(addExpenseThunk(expenseDetails));
    router.push("/dashboard");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <CenterLayout>
          <h1 className={styles.header}>Add new expense</h1>
          <Form
            fields={{ Title: "text", Amount: "number", Date: "date" }}
            button="add expense"
            onChange={changeHandler}
            onSubmit={submitHandler}
          />
        </CenterLayout>
      </main>
    </div>
  );
};

export default Index;
