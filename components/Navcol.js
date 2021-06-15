import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/Navcol.module.scss";

const articleSvg = (
  <svg
    viewBox="-20 0 15 16"
  >
        
    <text className={styles.text} x="-42" y="10" fill="#768390">ADMIN</text>
    <title>Admin</title>
    <path
      fillRule="evenodd"
      d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
    ></path>
  </svg>
);
const keyFrameForward = {
  animation: "turnForward 0.3s linear",
  animationFillMode: "forwards",
};
const keyFrameBackward = {
  animation: "turnBackward 0.3s linear",
  animationFillMode: "backwards",
};
export const Navcol = (props) => {
  const router = useRouter();
  const ref = React.createRef();
  const [expand, setExpand] = React.useState({
    toggle: true,
  });
  const handleStyleExpand = () => {
    props.handleDisplay({ display: expand.toggle ? "none" : "flex" });
    setExpand({
      transform: expand.toggle ? keyFrameForward : keyFrameBackward,
      opacity: expand.toggle ? "1" : "0",
      marginTop: expand.toggle ? "10px" : "-30px",
      display:expand.toggle ?"block":"none",
      toggle: !expand.toggle,
    });
  };
  const changeText = () => {
    switch (router.query.lang) {
      case "tr":
        return {
          lang: "tr",
          navbars: ["HAKKIMDA", "BLOG"],
        };
      case "en":
        return {
          lang: "en",
          navbars: ["ABOUT", "BLOG"],
        };

      case "de":
        return {
          lang: "de",
          navbars: ["ÜBER MICH", "BLOG"],
        };

      default:
        return {
          lang: "tr",
          navbars: ["HAKKIMDA", "BLOG"],
        };
    }
  };
  const nav_text = React.useMemo(() => changeText(), [router.query.lang]);

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
  }, [ref,router.query.lang]);
  return (
    <div className={styles.navcol}>
      <div className={styles.tabs} ref={ref}>
        <div>
          <Link
            href={
              "/about?lang=" +
              `${router.query.lang === undefined ? "tr" : router.query.lang}`
            }
          >
            {nav_text.navbars[0]}
          </Link>
        </div>
        <div>
          <Link
            href={
              "/blog?lang=" +
              `${router.query.lang === undefined ? "tr" : router.query.lang}`
            }
          >
            {nav_text.navbars[1]}
          </Link>
        </div>
        <span
          onClick={handleStyleExpand}
          className={styles.expand}
          style={expand.transform}
        ></span>

        <div
          style={{
            transition: "opacity 1s,margin-top 0.3s",
            opacity: expand.opacity,
            marginTop: expand.marginTop,
            display:expand.display
          }}
          className={styles.admin}
        >
          <Link
            href={
              "/admin?lang=" +
              `${router.query.lang === undefined ? "tr" : router.query.lang}`
            }
          >
            {articleSvg}
          </Link>
        </div>
      </div>
    </div>
  );
};
