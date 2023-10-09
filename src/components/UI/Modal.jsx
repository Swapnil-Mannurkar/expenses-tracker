import React from "react";
import styles from "./Modal.module.css";
import CenterLayout from "./CenterLayout";
import { useDispatch } from "react-redux";
import { getTransactionsByDateActions } from "@/store/getTransactionsByDateSlice";

const Modal = ({ children, closeModal }) => {
  const dispatch = useDispatch();

  const onCloseModal = () => {
    closeModal();
    dispatch(getTransactionsByDateActions.reset());
  };

  return (
    <>
      <div className={styles.modalContainer} onClick={onCloseModal}></div>
      <CenterLayout>{children}</CenterLayout>
    </>
  );
};

export default Modal;
