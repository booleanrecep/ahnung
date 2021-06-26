import React from "react";
import { useRouter } from "next/router";
import { apiCallClap } from "../helpers/index";
import styles from "../styles/components/Article.module.scss";
import Image from "next/image";
import {
  clapSvg,
  twitterSvg,
  linkedinSvg,
  fullScreenSvg,
  exitFullScreenSvg,
} from "./svg/index";

export const Article = ({
  clapCount,
  date,
  _id,
  readMin,
  shareLnkd,
  shareTwt,
  tags,
  text,
  title,
  img,
}) => {
  const router = useRouter();
  const ref = React.useRef();
  const [state, setState] = React.useState({
    load: true,
    clapC: clapCount,
    id: _id,
    clapToggle: false,
    fullScreenToggle: false,
  });
  const handleFullScreenClick = () => {
    let contentDiv = ref.current.parentElement.parentElement.parentElement;
    Array.from(contentDiv.classList).includes("full-screen")
      ? (contentDiv.classList.remove("full-screen"),
        setState((prevS) => ({ ...prevS, fullScreenToggle: false })))
      : (contentDiv.classList.add("full-screen"),
        setState((prevS) => ({ ...prevS, fullScreenToggle: true })));
  };
  const handleClapClick = async () => {
    try {
      apiCallClap(router.query.lang, state);

      setState((prevS) => ({
        ...prevS,
        clapC: prevS.clapC + 1,
        clapToggle: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClapMouseUp = () => {
    setState((preS) => ({ ...preS, clapToggle: false }));
  };
  React.useEffect(() => {
    setState((preS) => ({ ...preS, clapToggle: false }));
    const id = setTimeout(
      () => setState((prevS) => ({ ...prevS, load: false, clapC: clapCount })),
      300
    );
    return () => {
      setState((prevS) => ({ ...prevS, load: true }));
      clearTimeout(id);
    };
  }, [title]);

  return (
    <>
      {state.load === true ? (
        <div className="loader" />
      ) : (
        <>
          <div ref={ref} className={styles.headerdiv}>
            <span className={styles.fullscreen} onClick={handleFullScreenClick}>
              {state.fullScreenToggle ? exitFullScreenSvg : fullScreenSvg}
            </span>
            <Image src="/static/bonn.jpg" width={1000} height={250} />
            <h3>{title}</h3>
            <div className={styles.tools}>
              <div className={styles.counts}>
                {readMin} min read |{" "}
                <span
                  onClick={handleClapClick}
                  onMouseUp={handleClapMouseUp}
                  style={{
                    animation: state.clapToggle
                      ? "color-pop .3s linear "
                      : "none",
                  }}
                >
                  {clapSvg}
                </span>{" "}
                <sup
                  style={{
                    animation: state.clapToggle
                      ? "color-pop .3s linear "
                      : "none",
                  }}
                >
                  {state.clapC}
                </sup>
              </div>
              <div className={styles.date}>{date && date.slice(0, 10)}</div>
              <div className={styles.tags}>
                {tags &&
                  tags.map((tag) => (
                    <span key={tag}>
                      <a>{tag}</a>
                    </span>
                  ))}
              </div>
              <div className={styles.socials}>
                {twitterSvg} {linkedinSvg}
              </div>
            </div>
          </div>
          <div className={styles.text}>
            <p>{text}</p>
          </div>
        </>
      )}
    </>
  );
};
