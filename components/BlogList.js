import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/BlogList.module.scss";
const editSvg = (
  <svg viewBox="0 -2 16 16" height="16" width="16">
    <path
      fillRule="evenodd"
      d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
    ></path>
  </svg>
);

const garbageSvg = (
  <svg viewBox="0 -2 20 20" height="16" width="16">
    <path
      fillRule="evenodd"
      d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
    ></path>
  </svg>
);

const arrowSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="red"
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
  </svg>
);
export const BlogList = ({
  handleArticleIndex,
  articles,
  showFunc,
  handleEdit,
  handleDelete,
}) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    windowWidth: 0,
    toggle: false,
  });

  const mobileWidth = 550;
  const handleUpDownClick = () => {
    setState((prevS) => ({
      ...prevS,
      toggle: !prevS.toggle,
    }));
  };

  React.useEffect(() => {
    const windowWidth = window.innerWidth;
    const handleResize = () =>
      setState((prevS) => ({
        ...prevS,
        windowWidth: windowWidth,
      }));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router.query.lang]);

  return (
    <div
      className={styles.bloglist}
      style={{
        height: !state.toggle ? 160 + "px" : articles.length * 60 + "px",
      }}
    >
      <ol>
        {articles.map(({ title, _id, deletable }) => (
          <li
            key={_id}
            onClick={showFunc ? undefined : () => handleArticleIndex(_id)}
          >
            <Link
              href={{
                pathname: "/blog",
                query: {
                  lang: router.query.lang,
                  article: title.replace(/\s|!/g, "-").toLowerCase(),
                },
              }}
              replace
              shallow
            >
              <h4>{title.length > 15 ? title.slice(0, 15) + "..." : title}</h4>
            </Link>
            {showFunc ? (
              <div
                className={styles.functions}
                style={
                  deletable
                    ? { filter: "saturate(1) blur(0px)" }
                    : { filter: "saturate(0) blur(1.5px)" }
                }
              >
                <div onClick={deletable ? () => handleEdit(_id) : () => null}>
                  {editSvg}
                </div>
                <div onClick={deletable ? () => handleDelete(_id) : () => null}>
                  {garbageSvg}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      {state.windowWidth < mobileWidth && !showFunc ? (
        <span
          className={styles.arrows}
          style={{
            transform: state.toggle ? "rotate(-90deg)" : "rotate(90deg)",
          }}
          onClick={handleUpDownClick}
        >
          {arrowSvg}{" "}
        </span>
      ) : null}
    </div>
  );
};
