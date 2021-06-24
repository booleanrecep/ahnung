import React from "react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  console.log("HHH");
  return (
    <header className={`${styles.header}`}>
      <div id="lang">
        <Link href={router.pathname + "?lang=tr"}>TR</Link>
        <Link href={router.pathname + "?lang=en"}>EN</Link>
        <Link href={router.pathname + "?lang=de"}>DE</Link>
      </div>
    </header>
  );
};
