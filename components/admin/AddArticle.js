import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/admin/AddArticle.module.scss";
import  {capitalize,countMinute} from "../../helpers/index"
export const AddArticle = ({IP,articleToEdit}) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    title: articleToEdit.isEdit ? articleToEdit.article.title : "",
    text: articleToEdit.isEdit ? articleToEdit.article.text : "",
    id: articleToEdit.isEdit ? articleToEdit.article._id : null,
    created: "none",
    stoids: [],
    stopSubmit: false,
    shakeIt: false,
    load:true
  });
  const handleChange = (e) => {
    e.preventDefault();
    setState((prevS) => ({
      ...prevS,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((preS) => ({ ...preS, stopSubmit: true, shakeIt: false }));

    switch (articleToEdit.isEdit) {
      case true:
        try {
          const updateArt = await fetch("/api/data?lang=" + router.query.lang, {
            headers: {
              accept: "*/*",
              "content-type": "application/json; charset=UTF-8",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
            },
            body: JSON.stringify({
              title: capitalize(state.title),
              text: state.text,
              _id: state.id,
            }),
            method: "PUT",
            credentials: "omit",
          });

          const id1 = setTimeout(
            () => setState({ title: "", text: "", created: "none" }),
            1900
          );
          const id2 = setTimeout(
            () => router.push("/blog?lang=" + router.query.lang),
            2000
          );
          setState((prevS) => ({
            ...prevS,
            created: "flex",
            stoids: [id1, id2],
          }));
        } catch (error) {
          console.log(error);
        }
        break;

      case false:
        try {
          const newData = await fetch("/api/data?lang=" + router.query.lang, {
            headers: {
              accept: "*/*",
              "content-type": "application/json; charset=UTF-8",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({
              title: capitalize(state.title),
              text: state.text,
              readMin:countMinute(state.text)
            }),
            method: "POST",
            mode: "cors",
            credentials: "omit",
          });
          console.log(newData.statusText);

          const id1 = setTimeout(
            () => setState({ title: "", text: "", created: "none" }),
            1900
          );
          const id2 = setTimeout(
            () => router.push("/blog?lang=" + router.query.lang),
            2000
          );
          setState((prevS) => ({
            ...prevS,
            created: "flex",
            stoids: [id1, id2],
          }));
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    // articleToEdit.isEdit
    //   ? router.replace(
    //       "/admin?lang=" +
    //         router.query.lang +
    //         "&edit=" +
    //         articleToEdit.article.title
    //           .replace(/\s|!/g, "-")
    //           .toLowerCase()
    //     )
    //   : router.push("/admin?lang=" + router.query.lang + "&new-article");

    const id = setTimeout(() => setState((preS) => ({ ...preS, load: false })), 300);
    return () => {
      setState((preS) => ({ ...preS, load: true, shakeIt: false  }))
      clearTimeout(id);
      state.stoids.map((id) => clearTimeout(id));
    };
  }, [router.query.lang]);
  return (
    <>
      {state.load === true ? (
        <div className="loader" />
      ) : (
        <>
          <div style={{ display: state.created }} className="article-created">
            <span>&#10004;</span>
            <b>{state.title}</b>
            <i>created</i>
            <span>
              <small>Your IP: </small>
              <strong>
                <small>{IP}</small>
              </strong>
            </span>
          </div>
          <form
            className={styles.articleForm}
            method="post"
            onSubmit={handleSubmit}
          >
            <textarea
              name="title"
              placeholder="Title..."
              value={state.title}
              className={styles.title}
              type="text"
              maxLength="70"
              spellCheck="false"
              required
              onChange={handleChange}
            />
            <textarea
              name="text"
              type="text"
              value={state.text}
              rows="15"
              className={styles.textarea}
              placeholder="Text..."
              spellCheck="false"
              required
              onChange={handleChange}
            />
            <input
              className={styles.submit}
              type="submit"
              value="Submit"
              disabled={state.stopSubmit}
              onClick={() => setState((preS) => ({ ...preS, shakeIt: true }))}
              onMouseOut={() =>
                setState((preS) => ({ ...preS, shakeIt: false }))
              }
              onMouseUp={() =>
                setState((preS) => ({ ...preS, shakeIt: false }))
              }
              style={{
                backgroundColor: state.stopSubmit ? "#c73636" : "c2d686",
                color: state.stopSubmit ? "#e6c6b3" : "#425d0d",
                filter: state.stopSubmit ? "contrast(0.5)" : "none",
                position: "relative",
                animation: state.shakeIt ? "sars 80ms linear 2" : "none",
              }}
            />
          </form>
        </>
      )}
    </>
  );
};
