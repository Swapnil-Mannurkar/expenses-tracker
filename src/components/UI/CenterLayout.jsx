import React from "react";
import styles from "./CenterLayout.module.css";

const CenterLayout = ({ children }) => {
  return <div className={styles.centerLayout}>{children}</div>;
};

export default CenterLayout;
