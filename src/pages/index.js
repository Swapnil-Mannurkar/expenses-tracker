import Head from "next/head";
import styles from "@/pages/Home.module.css";
import Login from "@/components/login/Login";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === true) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Manage your expenses record" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Login />
      </main>
    </>
  );
}
