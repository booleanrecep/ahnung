import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/admin/AddArticle.module.scss";

export const AddArticle =(props)=>{
  const { IP } = props;
  const router = useRouter();
  const [state, setState] = React.useState({
    title: "",
    text: "",
    created: "none",
    stoids:[]
  });
  const ref = React.useRef()
  const handleChange = (e) => {
    e.preventDefault();
    setState((prevS) => ({
      ...prevS,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnInvalid = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.style)
    e.target.setCustomValidity("Ooo! Something is wrong!")
    // console.log(e)
  }
  // const handleOninput = (e) => {
  //   console.log(e.target)
  //   console.log(e.target.style)
  // }
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
      console.log(newData.statusText)
      const id1 = setTimeout(
      () => setState({ title: "", text: "", created: "none" }),
        1900
      );
      const id2 = setTimeout(
        () =>router.push("/blog?lang=" + router.query.lang),
          2000
        );
        setState((prevS) => ({ ...prevS, created: "flex",stoids:[id1,id2] }));

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
      state.stoids.map((id)=>clearTimeout(id))
    };
  }, [router.query.lang]);
  return (
    <>
      {load === true ? (
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
          <form className={styles.articleForm} method="post" onSubmit={handleSubmit}>
            <textarea
              name="title"
              placeholder="Title..."
              value={state.title}
              className={styles.title}
              type="text"
              maxLength="70"
              // minLength="5"
              spellCheck="false"
              required
              // pattern="[/^(\w+\s?)*\s*$/]"
              onChange={handleChange}
              onInvalid={handleOnInvalid}
              // onInput={handleOninput}

            />
            <textarea
              name="text"
              type="text"
              value={state.text}
              rows="15"
              // minLength="50"
              className={styles.textarea}
              placeholder="Text..."
              spellCheck="false"
              required
              onChange={handleChange}
              onInvalid={handleOnInvalid}

            />
            <input
              className={styles.submit}
              type="submit"
              // onClick={handleSubmit}
              value="Submit"
            />
          </form>
        </>
      )}
    </>
  );
}