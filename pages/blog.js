import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/blog.module.scss";
import { Article, BlogList } from "../components/index";

export default function Blog({ db_data }) {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);
  const handleIndex = (id) => {
    const indx = db_data.articles.findIndex((art) => art._id === id);
    setIndex(indx);
  };
  React.useEffect(() => {
    return () => setIndex(0);
  }, [router.query.lang]);
  return (
    <>
      <div className={styles.blog}>
        <BlogList
          handleArticleIndex={handleIndex}
          articles={db_data.articles}
          />
        <article className={styles.article}>
          <Article {...db_data.articles[index]} />
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
