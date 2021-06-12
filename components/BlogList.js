import styles from "../styles/components/BlogList.module.scss";

export const BlogList = (props) => {
  return (
    <div className={styles.bloglist}>
      <ol>
        <>
          {props.db_data.articles.map(({ title, _id }) => (
            <li key={_id} onClick={() => props.handleClick(_id)}>
              <h4>{title.length > 15 ? title.slice(0, 15) + "..." : title}</h4>
            </li>
          ))}
        </>
      </ol>
    </div>
  );
};
