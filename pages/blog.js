import React from "react";
import styles from "../styles/pages/blog.module.scss";
import { Article } from "../components/Article";
import { BlogList } from "../components/BlogList";

export default function Blog(props) {
  const [index, setIndex] = React.useState(0);
  const handleIndex = (id) => {
    const indx = props.db_data.articles.findIndex((art) => art._id === id);
    setIndex(indx);
  };
  return (
    <>
      <div className={styles.blog}>
        <BlogList
          handleArticleIndex={handleIndex}
          list={props.db_data.articles}
        />
        <article className={styles.article}>
          <Article {...props.db_data.articles[index]} />
        </article>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  switch (ctx.query.lang) {
    case "tr":
      const resTR = await fetch(process.env.server + "/api/data?lang=tr");
      const jsonTR = await resTR.json();
      return {
        props: {
          db_data: jsonTR,
        },
      };
    case "de":
      const resDE = await fetch(process.env.server + "/api/data?lang=de");
      const jsonDE = await resDE.json();
      return {
        props: {
          db_data: jsonDE,
        },
      };
    case "en":
      const resEN = await fetch(process.env.server + "/api/data?lang=en");
      const jsonEN = await resEN.json();
      return {
        props: {
          db_data: jsonEN,
        },
      };

    default:
      const res = await fetch(process.env.server + "/api/data?lang=tr");
      const json = await res.json();
      return {
        props: {
          db_data: json,
        },
      };
  }
}
