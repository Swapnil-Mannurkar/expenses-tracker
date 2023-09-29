import React, { useState } from "react";
import styles from "./AddExpense.module.css";
import Navbar from "@/components/navbar/Navbar";
import Form from "@/components/UI/Form";
import CenterLayout from "@/components/UI/CenterLayout";

const index = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const changeHandler = (value, field) => {
    if (field === "Title") {
      setTitle(value);
    } else if (field === "Amount") {
      setAmount(value);
    }
  };

  const submitHandler = () => {};

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <CenterLayout>
          <h1 className={styles.header}>Add new expense</h1>
          <Form
            fields={{ Title: "text", Amount: "number" }}
            button="submit"
            onChange={changeHandler}
            onSubmit={submitHandler}
          />
        </CenterLayout>
      </main>
    </div>
  );
};

export default index;
