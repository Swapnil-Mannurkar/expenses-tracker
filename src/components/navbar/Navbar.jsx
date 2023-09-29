import React from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginActions } from "@/store/loginSlice";
import DarkButton from "../UI/DarkButton";
import Link from "next/link";

const Navbar = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentPage = router.pathname.slice(1);

  const logoutHandler = () => {
    dispatch(loginActions.logout());
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            <Link href="/">expense tracker</Link>
          </h2>
        </div>
        <div className={styles.navItemsContainer}>
          <ul className={styles.navbarItems}>
            <li
              className={styles.navbarItem}
              style={currentPage === "dashboard" ? { color: "red" } : {}}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={styles.navbarItem}
              style={currentPage === "add-expense" ? { color: "red" } : {}}
            >
              <Link href="/add-expense">add expense</Link>
            </li>
            <li className={styles.navbarItem}>
              <DarkButton onClick={logoutHandler} title="logout"></DarkButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
