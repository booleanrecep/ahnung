import Link from "next/link";
import { useRouter } from "next/router";
import {addSvg} from "../svg/index"
import styles from "../../styles/components/admin/NewArticle.module.scss";

export const NewArticle = ({handleNew}) => {
  const router = useRouter();
  return (
    <div className={styles.new_article}>
      New Article
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
