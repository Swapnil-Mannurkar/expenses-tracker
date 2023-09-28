import React from "react";
import styles from "./DarkButton.module.css";

const DarkButton = (props) => {
  return (
    <button className={styles.button} type="submit">
      {props.title}
    </button>
  );
};

export default DarkButton;
