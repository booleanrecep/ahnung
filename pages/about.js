import React from "react";
import styles from "../styles/pages/about.module.scss";
import Image from "next/image";
import { Layout } from "../components/Layout";
import { useSelector } from "react-redux";

const githubSvg = (
  <svg
    height="20"
    viewBox="0 0 16 16"
    version="1.1"
    width="20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    ></path>
  </svg>
);
const mailSvg = (
  <svg
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
    ></path>
  </svg>
);
export default function About() {
  const state = useSelector((state) => state.about);

  return (
    <Layout>
      <div className={styles.about}>
        <div className={styles.imagediv}>
          <Image src="/static/me.png" width={600} height={800} />
          <h4>Recep Öztürk</h4>
          <ul>
            <li>
              <a href="https://github.com/booleanrecep" target="_blank">
                {githubSvg}
                <code>github.com/booleanrecep</code>
              </a>
            </li>
            <li>
              <a href="mailto:recep.fed@gmail.com">
                {mailSvg}
                <code>recep.fed@gmail.com</code>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.descriptiondiv}>
          <h3>{state.title}</h3>
          <p>{state.desc}</p>
        </div>
      </div>
    </Layout>
  );
}
