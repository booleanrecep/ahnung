import React from "react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

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

export const Header = ({display}) => {
  const router = useRouter();
  const ref = React.createRef();
  const [state,setState]=React.useState(null)
  const handlePosition = React.useCallback(() => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (objStyles(state.style, objStyleBegin),
        chldStyles(state.children, childStyleBegin))
      : (objStyles(state.style, objStyleEnd),
        chldStyles(state.children, childStyleEnd));
  }, [state]);

  React.useEffect(() => {
    setState(ref.current)
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, [ref]);
  return (
    <header className={`${styles.header}`}>
      <div id="lang" ref={ref} style={{ display: display }}>
        <Link href={router.pathname + "?lang=tr"}>TR</Link>
        <Link href={router.pathname + "?lang=en"}>EN</Link>
        <Link href={router.pathname + "?lang=de"}>DE</Link>
      </div>
    </header>
  );
};
