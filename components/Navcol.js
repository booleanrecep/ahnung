import React from "react"

import styles from "../styles/components/Navcol.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

export const Navcol = () => {
  const ref = React.createRef()

  const state = useSelector((state) => state.navcols);
  const handlePosition=()=>{
    return window.pageYOffset>60?ref.current.style.position="fixed":ref.current.style.position="inherit"
   }
   React.useEffect(()=>{
   
    console.log(ref.current)
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
   },[])
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
