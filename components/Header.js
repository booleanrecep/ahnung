import styles from "../styles/components/Header.module.scss";

export const Header = () => (
  <header className={`${styles.header}`}>
    <div>
      <a>TR</a>
      <a>EN</a>
      <a>DE</a>
    </div>
  </header>
);
