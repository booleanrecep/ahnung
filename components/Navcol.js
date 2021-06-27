import React from "react";
import styles from "../styles/components/Navcol.module.scss";
import { NavLink } from "./index";

export const Navcol = React.memo(() => {
  
  React.useEffect(() => {
    const handlePosition = () => {
      const div = document.querySelector(`.${styles.tabs}`);
      window.pageYOffset > 50 && window.innerWidth > 768
        ? (div.style.top = "0px")
        : (div.style.top = "55px");
    };
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, []);

  return (
    <div className={styles.navcol}>
      <div className={styles.tabs}>
        <NavLink  />
      </div>
    </div>
  );
});

