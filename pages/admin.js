import React from "react";
import {useRouter} from "next/router"

import styles from "../styles/pages/admin.module.scss";
const Admin = () => {
  const router = useRouter()

  const [state, setState] = React.useState({ title: "", text: "" });
  const handleChange = (e) => {
    e.preventDefault();
    console.log(state);
    setState((prevS) => ({
      ...prevS,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  const [min, setMin] = React.useState(1);
  React.useEffect(() => {
    const id = setTimeout(() => setMin(0), 500);
    return () => {
      setMin(1);
      clearTimeout(id);
    };
  }, [router.query.lang]);

  return (
    <>
      {min == 1 ? (
        <div className="loader" />
      ) : (
        <form className={styles.articleForm}>
          <textarea
            name="title"
            onChange={handleChange}
            className={styles.title}
            type="text"
            maxLength="70"
            placeholder="Title..."
          />
          <textarea
            name="text"
            onChange={handleChange}
            rows="30"
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
      )}
    </>
  );
};
export default Admin;
