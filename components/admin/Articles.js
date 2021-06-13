import { BlogList } from "../BlogList";
import styles from "../../styles/components/admin/Articles.module.scss";

export const Articles = (props) => {
  return (
    <div>
      <details className={styles.details}>
        <summary>Articles</summary>
        <div className={styles.list}>
          <BlogList showFunc={true} list={props.articles} />
        </div>
      </details>
    </div>
  );
};