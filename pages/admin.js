import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/admin.module.scss";
import { Articles } from "../components/admin/Articles";
import { AddArticle } from "../components/admin/AddArticle";
import { NewArticle } from "../components/admin/NewArticle";

const Admin = (props) => {
  const router = useRouter();
  const queryStr = "/admin?lang=" + router.query.lang;

  const [newarticle, setNewarticle] = React.useState(false);
  const handleClick = () => {
    router.replace(queryStr, queryStr + "&new-article", { shallow: true });
    setNewarticle(true);
  };

  const [load, setLoad] = React.useState(true);
  React.useEffect(() => {
    router.asPath === queryStr + "&new-article"
      ? setNewarticle(true)
      : setNewarticle(false);
    const id = setTimeout(() => setLoad(false), 300);
    return () => {
      setLoad(true);
      clearTimeout(id);
    };
  }, [router.query.lang, router.asPath]);
  return (
    <>
      {newarticle ? (
        <AddArticle />
      ) : load === true ? (
        <div className="loader" />
      ) : (
        <div className={styles.admin_page}>
          <div>
            <NewArticle handleClick={handleClick} />
          </div>
          <div>
            <Articles articles={props.db_data.articles} />
          </div>
        </div>
      )}
    </>
  );
};
export default Admin;

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
