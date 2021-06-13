import { BlogList } from "../BlogList";
import styles from "../../styles/components/admin/Articles.module.scss";
const dummy = {
  articles: [
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
    { title: "Title", _id: "ID" },
  ],
};
export const Articles = () => {
  return (
    <div>
      <details className={styles.details}>
        <summary>Articles</summary>
        <div className={styles.list}>
          <BlogList showFunc={{display:true}} db_data={dummy} />
        </div>
      </details>
    </div>
  );
};
