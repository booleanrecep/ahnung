import React from "react";

import { Layout } from "../components/Layout";
import styles from "../styles/pages/blog.module.scss";
import { Article } from "../components/Article";


export default function Blog(props) {
  const [data, setData] = React.useState(props.languages.tr);
  const [index,setIndex]=React.useState(0)
  const handleClick = (lang) => {
    switch (lang) {
      case "tr":
        setData(props.languages.tr);
        break;
      case "en":
        setData(props.languages.en);
        break;

      case "de":
        setData(props.languages.de);
        break;

      default:
        setData(props.languages.tr);
        break;
    }
  };
  const handleClickIndex=(id)=>{
    const indx=data.articles.findIndex(art=>art.id===id)
    setIndex(indx)

  }
  return (
    <>
    <Layout handleClick={handleClick}>
        <div className={styles.blog}>
          <div className={styles.bloglist}>
            <ol>
              <>
                {data.articles.map(({ title, id }) => (
                  <li key={id} onClick={()=>handleClickIndex(id)}>
                    <h5>
                      {title.length > 15 ? title.slice(0, 15) + "..." : title}
                    </h5>
                  </li>
                ))}
              </>
            </ol>
          </div>
          <article className={styles.article}>
            <Article {...data.articles[index]} />
          </article>
        </div>
      </Layout>
    </>
  );
}


export async function getStaticProps() {

  const res = await fetch("http://localhost:3000/api/data");
  const json = await res.json();
  console.log(json)
  return {
    props: {
      languages:json
    },
  };
}
