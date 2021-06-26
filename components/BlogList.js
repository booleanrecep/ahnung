import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/BlogList.module.scss";
import { editSvg, garbageSvg, arrowSvg } from "./svg/index";

export const BlogList = ({
  handleArticleIndex,
  articles,
  showFunc,
  handleEdit,
  handleDelete,
}) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    toggle: false,
  });

  const handleUpDownClick = () => {
    setState((prevS) => ({
      ...prevS,
      toggle: !prevS.toggle,
    }));
  };

  React.useEffect(() => {
    setState((prevS) => ({
      ...prevS,
      toggle: false,
    }));
  }, [router.query.lang]);

  return (
    <div
      className={styles.bloglist}
      
    >
      <ol style={{
        height: !state.toggle ? 100 + "px" : articles.length * 47 + "px",
      }}>
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
      <span
        className={styles.arrows}
        style={{
          transform: state.toggle ? "rotate(-90deg)" : "rotate(90deg)",
        }}
        onClick={handleUpDownClick}
      >
        {arrowSvg}{" "}
      </span>
    </div>
  );
};
