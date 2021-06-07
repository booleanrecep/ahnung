import React from "react";
import styles from "../styles/pages/admin.module.scss";
const Admin = () => {
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

  return (
    <>
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
    </>
  );
};
export default Admin;
