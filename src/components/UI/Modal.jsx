import React from "react";
import styles from "./Modal.module.css";
import CenterLayout from "./CenterLayout";

const Modal = ({ children, closeModal }) => {

  const onCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <div className={styles.modalContainer} onClick={onCloseModal}></div>
      <CenterLayout>{children}</CenterLayout>
    </>
  );
};

export default Modal;
