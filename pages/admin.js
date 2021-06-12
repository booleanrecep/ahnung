import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/admin.module.scss";

const Admin = () => {
  const router = useRouter();
  const [state, setState] = React.useState({
    title: "",
    text: "",
    created: "none",
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
    try {
      const newData = await fetch("/api/data?lang=" + router.query.lang, {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json; charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
        },
        referrer: "http://localhost:3000/admin?lang=en",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(state),
        method: "POST",
        mode: "cors",
        credentials: "omit",
      });
      setState((prevS) => ({ ...prevS, created: "block" }));
      const id = setTimeout(
        () => setState({ title: "", text: "", created: "none" }),
        100
      );

      return (() => (
        clearTimeout(id), router.push("/blog?lang=" + router.query.lang)
      ))();
    } catch (error) {
      console.log(error);
    }
  };
  const [load, setLoad] = React.useState(true);
  React.useEffect(() => {
    const id = setTimeout(() => setLoad(false), 300);
    return () => {
      setLoad(true);
      clearTimeout(id);
    };
  }, [router.query.lang]);
  return (
    <>
      {load === true ? (
        <div className="loader" />
      ) : (
        <>
          <div style={{ display: state.created }} className="article-created">
            &#10004; {state.title} created
          </div>
          <form className={styles.articleForm}>
            <textarea
              name="title"
              value={state.title}
              onChange={handleChange}
              className={styles.title}
              type="text"
              maxLength="70"
              placeholder="Title..."
            />
            <textarea
              name="text"
              value={state.text}
              onChange={handleChange}
              rows="15"
              className={styles.textarea}
              placeholder="Text..."
            />
            <input
              className={styles.submit}
              type="button"
              onClick={handleSubmit}
              value="Submit"
            />
          </form>
        </>
      )}
    </>
  );
};
export default Admin;
