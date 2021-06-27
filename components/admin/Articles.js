import React from "react";
import { useRouter } from "next/router";

import { BlogList } from "../index";
import styles from "../../styles/components/admin/Articles.module.scss";
import { changeUIText } from "../../helpers/routeState";

export const Articles = ({ handleDelete, handleEdit, articles }) => {
  const router = useRouter();
  const routeState = React.useMemo(
    () => changeUIText(router.query.lang),
    [router.query.lang]
  );
  const { admin } = routeState;

  return (
    <div>
      <details className={styles.details}>
        <summary>{admin.map(({ articles }) => articles)}</summary>
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
