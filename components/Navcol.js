import React from "react";

import styles from "../styles/components/Navcol.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

export const Navcol = () => {
  const ref = React.createRef();

  const state = useSelector((state) => state.navcols);
  const handlePosition = React.useCallback(() => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (ref.current.style.top = "0px")
      : (ref.current.style.top = "55px");
  }, [ref,state]);
  React.useEffect(() => {
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, [state,ref]);
  return (
    <div className={styles.navcol}>
      <div className={styles.tabs} ref={ref}>
        <div>
          <Link href="/about">{state[0]}</Link>
        </div>
        <div>
          <Link href="/blog">{state[1]}</Link>
        </div>
      </div>
    </div>
  );
};
