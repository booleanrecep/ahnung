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
  const [load, setLoad] = React.useState(true);
  React.useEffect(()=>{
    const id =setTimeout(()=>setLoad(false),300)
    return ()=>{
      setLoad(true)
      clearTimeout(id)
    }
  },[router.query.lang])

  return (
    <>
      {load ===true ? (
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
