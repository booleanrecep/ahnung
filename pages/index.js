import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import About from "./about";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AHNUNG</title>
        <meta name="description" content="Coming soon.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`${styles.header}`}>
        <div>
          <a>TR</a>
          <a>EN</a>
          <a>DE</a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.navcol}>
          <div>ABOUT</div>
          <div>BLOG</div>
          <div>CONTACT</div>
        </div>
        <div className={styles.content}>
          {/* <h3>CONTENT</h3> */}
          <About />
        </div>
      </main>

      <footer className={styles.footer}>Here comes the footer</footer>
    </div>
  );
}
