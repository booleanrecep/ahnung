import React from "react";
import { useRouter } from "next/router";
import { apiCallClap } from "../helpers/index";
import styles from "../styles/components/Article.module.scss";
import Image from "next/image";

const clapSvg = (
  <svg
    style={{ paddingBottom: "-10px" }}
    id="clap"
    width="23"
    fill="#264769"
    height="23"
    viewBox="0 0 25 25"
  >
    <g fillRule="evenodd">
      <path d="M 11.74 0 l 0.76 2.97 l 0.76 -2.97 z M 14.81 3.78 l 1.84 -2.56 l -1.42 -0.47 z M 8.38 1.22 l 1.84 2.56 L 9.8 0.75 z M 20.38 21.62 a 5.11 5.11 0 0 1 -3.16 1.61 l 0.49 -0.45 c 2.88 -2.89 3.45 -5.98 1.69 -9.21 l -1.1 -1.94 l -0.96 -2.02 c -0.31 -0.67 -0.23 -1.18 0.25 -1.55 a 0.84 0.84 0 0 1 0.66 -0.16 c 0.34 0.05 0.66 0.28 0.88 0.6 l 2.85 5.02 c 1.18 1.97 1.38 5.12 -1.6 8.1 M 7.1 21.1 l -5.02 -5.02 a 1 1 0 0 1 0.7 -1.7 a 1 1 0 0 1 0.72 0.3 l 2.6 2.6 a 0.44 0.44 0 0 0 0.63 -0.62 L 4.1 14.04 l -1.75 -1.75 a 1 1 0 1 1 1.41 -1.41 l 4.15 4.15 a 0.44 0.44 0 0 0 0.63 0 a 0.44 0.44 0 0 0 0 -0.62 L 4.4 10.26 L 3.22 9.08 a 1 1 0 0 1 0 -1.4 a 1.02 1.02 0 0 1 1.41 0 l 1.18 1.16 L 9.96 13 a 0.44 0.44 0 0 0 0.62 0 a 0.44 0.44 0 0 0 0 -0.63 L 6.43 8.22 a 0.99 0.99 0 0 1 -0.3 -0.7 a 0.99 0.99 0 0 1 0.3 -0.7 a 1 1 0 0 1 1.41 0 l 7 6.98 a 0.44 0.44 0 0 0 0.7 -0.5 l -1.35 -2.85 c -0.31 -0.68 -0.23 -1.19 0.25 -1.56 a 0.85 0.85 0 0 1 0.66 -0.16 c 0.34 0.06 0.66 0.28 0.88 0.6 L 18.63 14 c 1.57 2.88 1.07 5.54 -1.55 8.16 a 5.62 5.62 0 0 1 -5.06 1.65 a 9.35 9.35 0 0 1 -4.93 -2.72 z M 11 5.98 l 2.56 2.56 c -0.5 0.6 -0.56 1.41 -0.15 2.28 l 0.26 0.56 l -4.25 -4.25 a 0.98 0.98 0 0 1 -0.12 -0.45 a 1 1 0 0 1 0.29 -0.7 a 1.02 1.02 0 0 1 1.41 0 z m 8.89 2.06 c -0.38 -0.56 -0.9 -0.92 -1.49 -1.01 a 1.74 1.74 0 0 0 -1.34 0.33 c -0.38 0.29 -0.61 0.65 -0.71 1.06 a 2.1 2.1 0 0 0 -1.1 -0.56 a 1.78 1.78 0 0 0 -0.99 0.13 l -2.64 -2.64 a 1.88 1.88 0 0 0 -2.65 0 a 1.86 1.86 0 0 0 -0.48 0.85 a 1.89 1.89 0 0 0 -2.67 -0.01 a 1.87 1.87 0 0 0 -0.5 0.9 c -0.76 -0.75 -2 -0.75 -2.7 -0.04 a 1.88 1.88 0 0 0 0 2.66 c -0.3 0.12 -0.61 0.29 -0.87 0.55 a 1.88 1.88 0 0 0 0 2.66 l 0.62 0.62 a 1.88 1.88 0 0 0 -0.9 3.16 l 5.01 5.02 c 1.6 1.6 3.52 2.64 5.4 2.96 a 7.16 7.16 0 0 0 1.18 0.1 c 1.03 0 2 -0.25 2.9 -0.7 A 5.9 5.9 0 0 0 21 22.24 c 3.34 -3.34 3.08 -6.93 1.74 -9.17 l -2.87 -5.04 z"></path>
    </g>
  </svg>
);
const twitterSvg = (
  <svg id="twt" fill="#1da1f2" width="25" height="25" viewBox="0 -2 25 25">
    <path d="M22.3 4.3c-.82.51-1.72.88-2.67 1.08a4.25 4.25 0 0 0-6.18-.12 4.3 4.3 0 0 0-1.26 3.03c0 .34.04.67.08 1a12.2 12.2 0 0 1-8.81-4.52 4.8 4.8 0 0 0-.62 2.14 4.44 4.44 0 0 0 1.92 3.6 4.13 4.13 0 0 1-1.91-.55v.07c0 2.06 1.47 3.8 3.44 4.21-.37.08-.74.13-1.15.15l-.76-.07a4.32 4.32 0 0 0 3.98 2.99A9.03 9.03 0 0 1 3 19.14l-1-.06A12.26 12.26 0 0 0 8.6 21c7.88 0 12.2-6.55 12.17-12.18.02-.23.02-.41 0-.62a8.06 8.06 0 0 0 2.15-2.23c-.77.37-1.6.6-2.45.7a4.1 4.1 0 0 0 1.84-2.38"></path>
  </svg>
);
const linkedinSvg = (
  <svg id="lnk" width="25" height="25" viewBox="0 0 25 25" fill="#0a66c2">
    <path d="M5 6.36C5 5.61 5.63 5 6.4 5h16.2c.77 0 1.4.61 1.4 1.36v16.28c0 .75-.63 1.36-1.4 1.36H6.4c-.77 0-1.4-.6-1.4-1.36V6.36z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.76 20.9v-8.57H7.89v8.58h2.87zm-1.44-9.75c1 0 1.63-.65 1.63-1.48-.02-.84-.62-1.48-1.6-1.48-.99 0-1.63.64-1.63 1.48 0 .83.62 1.48 1.59 1.48h.01zM12.35 20.9h2.87v-4.79c0-.25.02-.5.1-.7.2-.5.67-1.04 1.46-1.04 1.04 0 1.46.8 1.46 1.95v4.59h2.87v-4.92c0-2.64-1.42-3.87-3.3-3.87-1.55 0-2.23.86-2.61 1.45h.02v-1.24h-2.87c.04.8 0 8.58 0 8.58z"
      fill="#fff"
    ></path>
  </svg>
);

const fullScreenSvg = (
  <svg viewBox="0 0 16 16" version="1.1" height="16" width="16">
    <title>Fullscreen</title>
    <path
      fillRule="evenodd"
      d="M2.75 2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0v-2.5C1 1.784 1.784 1 2.75 1h2.5a.75.75 0 010 1.5h-2.5zM10 1.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75zM1.75 10a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 011 13.25v-2.5a.75.75 0 01.75-.75zm12.5 0a.75.75 0 01.75.75v2.5A1.75 1.75 0 0113.25 15h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5a.75.75 0 01.75-.75z"
    ></path>
  </svg>
);
const exitFullScreenSvg = (
  <svg viewBox="0 0 16 16" version="1.1" height="16" width="16">
    <title>Exit fullscreen</title>
    <path
      fillRule="evenodd"
      d="M5.25 1a.75.75 0 01.75.75v2.5A1.75 1.75 0 014.25 6h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5A.75.75 0 015.25 1zm5.5 0a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 0110 4.25v-2.5a.75.75 0 01.75-.75zM1 10.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75zm9 1c0-.966.784-1.75 1.75-1.75h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0v-2.5z"
    ></path>
  </svg>
);

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
  }, [title, clapCount]);
  console.log(state);

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
