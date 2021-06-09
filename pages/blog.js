import React from "react";
import {useRouter} from "next/router"

import styles from "../styles/pages/blog.module.scss";
import { Article } from "../components/Article";
import { BlogList } from "../components/BlogList";

export default function Blog(props) {
  const [index, setIndex] = React.useState(0);

  const handleClickIndex = (id) => {
    const indx = props.db_data.articles.findIndex((art) => art.id === id);
    setIndex(indx);
  };

  const router = useRouter()
  const [load, setLoad] = React.useState(true);
  React.useEffect(()=>{
    const id =setTimeout(()=>setLoad(false),300)
    return ()=>{
      setLoad(true)
      clearTimeout(id)
    }
  },[router.query.lang,index])
  return (
    <>
      <div className={styles.blog}>
        <BlogList handleClick={handleClickIndex} db_data={props.db_data} />
        <article className={styles.article}>
        {load === true ? (
        <div className="loader" />
      ) : (
          <Article {...props.db_data.articles[index]} />
          )}
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
