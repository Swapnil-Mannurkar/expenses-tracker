import React from "react";
import styles from "./DarkButton.module.css";

const DarkButton = (props) => {
  
  const clickHandler = (e) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <button className={styles.button} type="submit" onClick={clickHandler}>
      {props.title}
    </button>
  );
};

export default DarkButton;
