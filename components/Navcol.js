import styles from "../styles/components/Navcol.module.scss";
import Link from "next/link";

export const Navcol = () => (
  <div className={styles.navcol}>
    <div>
      <Link href="/about">ABOUT</Link>
    </div>
    <div>
      <Link href="/blog">BLOG</Link>
    </div>
    {/* <div>
      <Link href="/contact">CONTACT</Link>
    </div> */}
  </div>
);
