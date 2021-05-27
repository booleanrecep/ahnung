import React from "react";
import styles from "../styles/pages/blog.module.scss";
import { Article } from "../components/Article";

export default function Blog(props) {
  // const [data, setData] = React.useState(props.languages.tr);
  const [index, setIndex] = React.useState(0);

  const handleClickIndex = (id) => {
    const indx = props.db_data.articles.findIndex((art) => art.id === id);
    setIndex(indx);
  };
  return (
    <>
      <div className={styles.blog}>
        <div className={styles.bloglist}>
          <ol>
            <>
              {props.db_data.articles.map(({ title, id }) => (
                <li key={id} onClick={() => handleClickIndex(id)}>
                  <h5>
                    {title.length > 15 ? title.slice(0, 15) + "..." : title}
                  </h5>
                </li>
              ))}
            </>
          </ol>
        </div>
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
      const resTR = await fetch("http://localhost:3000/api/data?lang=tr");
      const jsonTR = await resTR.json();
      return {
        props: {
          db_data: jsonTR,
        },
      };
    case "de":
      const resDE = await fetch("http://localhost:3000/api/data?lang=de");
      const jsonDE = await resDE.json();
      return {
        props: {
          db_data: jsonDE,
        },
      };
    case "en":
      const resEN = await fetch("http://localhost:3000/api/data?lang=en");
      const jsonEN = await resEN.json();
      return {
        props: {
          db_data: jsonEN,
        },
      };

    default:
      const res = await fetch("http://localhost:3000/api/data?lang=tr");
      const json = await res.json();
      return {
        props: {
          db_data: json,
        },
      };
  }

  // };
}
