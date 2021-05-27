import React from "react";

import styles from "../styles/components/Navcol.module.scss";
import Link from "next/link";
import {useRouter} from "next/router"
 
export const Navcol = () => {
  const router=useRouter()
  const ref = React.createRef();

  const changeText =() => {
    switch (router.query.lang) {
      case "tr":
        return ({
            lang: "tr",
            navbars: ["HAKKIMDA", "BLOG"],
        });
      case "en":
       return  ({
            lang: "en",
            navbars: ["ABOUT", "BLOG"],
        });

      case "de":
        return ({
            lang: "de",
            navbars: ["ÜBER MICH", "BLOG"],
        });

      default:
        return ({
            lang: "tr",
            navbars: ["HAKKIMDA", "BLOG"],
        });
    }
  }
  const nav_text= React.useMemo(()=>changeText(),[router.query.lang])

  const handlePosition = React.useCallback(() => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (ref.current.style.top = "0px")
      : (ref.current.style.top = "55px");
  }, [ref]);
  React.useEffect(() => {

    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };

  }, [ref]);
  return (
    <div  className={styles.navcol}>
      <div className={styles.tabs} ref={ref}>
        <div>
          <Link href={"/about?lang="+router.query.lang}>{nav_text.navbars[0]}</Link>
        </div>
        <div>
          <Link href={"/blog?lang="+router.query.lang}>{nav_text.navbars[1]}</Link>
        </div>
      </div>
    </div>
  );
};
