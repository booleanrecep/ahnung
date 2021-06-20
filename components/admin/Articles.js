import React from "react";
import { BlogList } from "../BlogList";
import styles from "../../styles/components/admin/Articles.module.scss";

export const Articles = ({ handleDelete, handleEdit, articles }) => {
  return (
    <div>
      <details className={styles.details}>
        <summary>Articles</summary>
        <div className={styles.list}>
          <BlogList
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showFunc={true}
            articles={articles}
          />
        </div>
      </details>
    </div>
  );
};
