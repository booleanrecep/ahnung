import React from "react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = (props) => {
  const router = useRouter();
  const ref = React.createRef();
  const objStyleBegin = {
    transform: "rotate(90deg)",
    margin: "50px -30px 0 0",
  };
  const objStyleEnd = {
    transform: "rotate(0deg)",
    margin: "10px",
  };
  const childStyleBegin = {
    transform: "rotate(-90deg)",
  };
  const childStyleEnd = {
    transform: "rotate(0deg)",
  };
  const objStyles = (obj, sty) => {
    Object.assign(obj, sty);
  };
  const chldStyles = (chldArr, sty) => {
    Array.prototype.slice
      .call(chldArr)
      .map((chl) => Object.assign(chl.style, sty));
  };
  const handlePosition = React.useCallback(() => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (objStyles(ref.current.style, objStyleBegin),
        chldStyles(ref.current.children, childStyleBegin))
      : (objStyles(ref.current.style, objStyleEnd),
        chldStyles(ref.current.children, childStyleEnd));
  }, [ref.current,router.asPath]);

  React.useEffect(() => {
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, [ref]);
  return (
    <header className={`${styles.header}`}>
      <div id="lang" ref={ref} style={{ display: props.display }}>
        <Link href={router.pathname + "?lang=tr"}>TR</Link>
        <Link href={router.pathname + "?lang=en"}>EN</Link>
        <Link href={router.pathname + "?lang=de"}>DE</Link>
      </div>
    </header>
  );
};
