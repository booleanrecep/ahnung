import React from "react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link"
import {useRouter} from "next/router"
export const Header = (props) => {
  const router=useRouter()
  const ref = React.createRef();
  const objStyle1 = {
    transform: "rotate(90deg)",
    margin: "50px -30px 0 0",
  };
  const objStyle2 = {
    transform: "rotate(0deg)",
    margin: "10px",
  };
  const childStyle1 = {
    transform: "rotate(-90deg)",
  };
  const childStyle2 = {
    transform: "rotate(0deg)",
  };
  const objStyles = (obj, sty) => {
    Object.assign(obj.style, sty);
  };
  const chldStyles = (chldArr, sty) => {
    Array.prototype.slice
      .call(chldArr)
      .map((chl) => Object.assign(chl.style, sty));
  };
  const handlePosition = React.useCallback(() => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (objStyles(ref.current, objStyle1),
        chldStyles(ref.current.children, childStyle1))
      : (objStyles(ref.current, objStyle2),
        chldStyles(ref.current.children, childStyle2));
  }, [ref]);

  React.useEffect(() => {
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, [ref]);
  return (
    <header className={`${styles.header}`}>
      <div id="lang" ref={ref}>
       <Link href={router.pathname+"?lang=tr"} >TR</Link>
        <Link href={router.pathname+"?lang=en"} >EN</Link>
        <Link href={router.pathname+"?lang=de"} onClick={props.handleClick}>DE</Link>
      </div>
    </header>
  );
};
