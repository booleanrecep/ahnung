import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/admin/AddArticle.module.scss";
import  {apiCallAdd,apiCallEdit} from "../../helpers/index"
export const AddArticle = ({IP,articleToEdit}) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    title: articleToEdit.isEdit ? articleToEdit.article.title : "",
    text: articleToEdit.isEdit ? articleToEdit.article.text : "",
    id: articleToEdit.isEdit ? articleToEdit.article._id : null,
    created: false,
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
          apiCallEdit(router.query.lang,state)
         
          const id1 = setTimeout(
            () => setState({ title: "", text: "", created: false }),
            1900
          );
          const id2 = setTimeout(
            () => router.push("/blog?lang=" + router.query.lang),
            2000
          );
          setState((prevS) => ({
            ...prevS,
            created: true,
            stoids: [id1, id2],
          }));
        } catch (error) {
          console.log(error);
        }
        break;

      case false:
        try {
          apiCallAdd(router.query.lang,state)

          const id1 = setTimeout(
            () => setState({ title: "", text: "", created: false }),
            1900
          );
          const id2 = setTimeout(
            () => router.push("/blog?lang=" + router.query.lang),
            2000
          );
          setState((prevS) => ({
            ...prevS,
            created: true,
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

  const popCreatedArticle =document.querySelector(".article-created") || {}

  state.created?
   popCreatedArticle.className="article-created-tick"
   :popCreatedArticle.className="article-created"
  React.useEffect(() => {
    const id = setTimeout(() => setState((preS) => ({ ...preS, load: false })), 300);
    return () => {
      popCreatedArticle.className="article-created"
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
      )}
    </>
  );
};
