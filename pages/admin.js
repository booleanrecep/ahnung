import React from "react";
import { useRouter } from "next/router";
import os from "os";

import styles from "../styles/pages/admin.module.scss";
import { Articles } from "../components/admin/Articles";
import { AddArticle } from "../components/admin/AddArticle";
import { NewArticle } from "../components/admin/NewArticle";

const Admin = (props) => {
  const router = useRouter();
  const queryStr = "/admin?lang=" + router.query.lang;
  const [shownew, setShownew] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const [articlesList, setArticleList] = React.useState(props.db_data.articles);
  const [editState, setEditState] = React.useState({article:null,isEdit:false});

  const handleNewArticle = () => {
    router.replace(queryStr, queryStr + "&new-article", { shallow: true });
    setShownew(true);
  };
  const handleDelete = async (id) => {
    try {
      const deleteArt =await fetch(
        "/api/data?lang=" + router.query.lang + "&articleID=" + id,
        {
          method: "DELETE",
          "content-type": "application/json; charset=UTF-8",
        }
      );
      const filteredList =await articlesList.filter(
        ({ _id }) => _id !== id
      );
      console.log(deleteArt)
      setArticleList(filteredList);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit =async (id) => {
    const editArt =   articlesList.find(
          ({ _id }) => _id === id
        );       

        setEditState({article:editArt,isEdit:true})
        setShownew(true)
    
  };
  React.useEffect(() => {
    // setArticleList(props.db_data.articles)
    // router.asPath === queryStr + "&new-article"
    //   ? setShownew(true)
    //   : setShownew(false);
    const id = setTimeout(() => setLoad(false), 300);
    return () => {
      setLoad(true);
      clearTimeout(id);
    };
  }, [router.query.lang]);
  return (
    <>
      {shownew ? (
        <AddArticle articleToEdit={editState} IP={props.IP} />
      ) : load === true ? (
        <div className="loader" />
      ) : (
        <div className={styles.admin_page}>
          <div>
            <NewArticle handleNew={handleNewArticle} />
          </div>
          <div>
            <Articles
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              articles={articlesList}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Admin;

export async function getServerSideProps(ctx) {
  const ip = Object.values(os.networkInterfaces())
    .flat()
    .find((i) => i.family == "IPv4" && !i.internal).address;
  switch (ctx.query.lang) {
    case "tr":
      const resTR = await fetch(process.env.server + "/api/data?lang=tr");
      const jsonTR = await resTR.json();
      return {
        props: {
          db_data: jsonTR,
          IP: ip,
        },
      };
    case "de":
      const resDE = await fetch(process.env.server + "/api/data?lang=de");
      const jsonDE = await resDE.json();
      return {
        props: {
          db_data: jsonDE,
          IP: ip,
        },
      };
    case "en":
      const resEN = await fetch(process.env.server + "/api/data?lang=en");
      const jsonEN = await resEN.json();
      return {
        props: {
          db_data: jsonEN,
          IP: ip,
        },
      };

    default:
      const res = await fetch(process.env.server + "/api/data?lang=tr");
      const json = await res.json();
      return {
        props: {
          db_data: json,
          IP: ip,
        },
      };
  }
}
