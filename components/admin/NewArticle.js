import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {addSvg} from "../svg/index"
import styles from "../../styles/components/admin/NewArticle.module.scss";
import {changeUIText} from "../../helpers/routeState"

export const NewArticle = ({handleNew}) => {
  const router = useRouter();
  const routeState = React.useMemo(()=>changeUIText(router.query.lang),[router.query.lang])
  const {admin} = routeState
  return (
    <div className={styles.new_article}>
      {admin.map(({newArticle})=>newArticle)}
      <Link
        href={{
          pathname: "/admin",
          query: {
            lang: router.query.lang,
            "new-article": true,
          },
        }}
      >
        <span onClick={handleNew}>{addSvg}</span>
      </Link>
    </div>
  );
};
