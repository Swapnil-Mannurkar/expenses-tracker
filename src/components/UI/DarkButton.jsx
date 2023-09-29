import React from "react";
import styles from "./DarkButton.module.css";

const DarkButton = ({ title, onClick }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      className={styles.button}
      type="submit"
      onClick={title === "logout" ? clickHandler : undefined}
    >
      {title}
    </button>
  );
};

export default DarkButton;
