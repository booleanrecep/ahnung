import React from "react";
import { useRouter } from "next/router";
import os from "os";

import styles from "../styles/pages/admin.module.scss";
import { NewArticle, AddArticle, Articles } from "../components/admin/index";

const Admin = ({ IP, db_data }) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    shownew: false,
    load: true,
    articlesList: db_data.articles,
    editState: {
      article: null,
      isEdit: false,
    },
  });
  const handleNewArticle = () => {
    // router.replace(queryStr, queryStr + "&new-article", { shallow: true });
    setState((prevS) => ({
      ...prevS,
      shownew: true,
    }));
  };
  const handleDelete = async (id) => {
    try {
      const deleteArt = await fetch(
        "/api/data?lang=" + router.query.lang + "&articleID=" + id,
        {
          method: "DELETE",
          "content-type": "application/json; charset=UTF-8",
        }
      );
      const filteredList = await state.articlesList.filter(
        ({ _id }) => _id !== id
      );
      setState((prevS) => ({
        ...prevS,
        articlesList: filteredList,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    const editArt = state.articlesList.find(({ _id }) => _id === id);
    setState((prevS) => ({
      ...prevS,
      shownew: true,
      editState: { article: editArt, isEdit: true },
    }));
  };
  React.useEffect(() => {
    const id = setTimeout(
      () =>
        setState((prevS) => ({
          ...prevS,
          load: false,
          articlesList: db_data.articles,
        })),
      300
    );
    return () => {
      setState((prevS) => ({
        ...prevS,
        load: true,
      }));
      clearTimeout(id);
    };
  }, [router.query.lang]);
  return (
    <>
      {state.shownew ? (
        <AddArticle articleToEdit={state.editState} IP={IP} />
      ) : state.load === true ? (
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
              articles={state.articlesList}
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
