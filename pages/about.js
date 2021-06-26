import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/pages/about.module.scss";
import { githubSvg, mailSvg } from "../components/svg/index";

export default function About({ db_data }) {
  const router = useRouter();
  const [state, setState] = React.useState({ load: true });
  React.useEffect(() => {
    const id = setTimeout(() => setState({ load: false }), 300);
    router.query.lang === undefined ? router.push("/about?lang=" + "tr") : null;
    return () => {
      clearTimeout(id);
      setState({ load: true });
    };
  }, [db_data.about.title]);
  return (
    <>
      {state.load === true ? (
        <div className="loader" />
      ) : (
        <div className={styles.about}>
          <div className={styles.imagediv}>
            <img src="/static/me.png" alt="Bonn" />
            <div>
              <h4>Recep Öztürk</h4>
              <ul>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="https://github.com/booleanrecep"
                    target="_blank"
                  >
                    {githubSvg}
                    <code>github.com/booleanrecep</code>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="mailto:recep.fed@gmail.com"
                  >
                    {mailSvg}
                    <code>recep.fed@gmail.com</code>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.descriptiondiv}>
            <h3>{db_data.about.title}</h3>
            <p>{db_data.about.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}
export async function getServerSideProps(ctx) {
  switch (ctx.query.lang) {
    case "tr":
      const resTR = await fetch(process.env.server + "/api/data?lang=tr");
      const jsonTR = await resTR.json();
      return {
        props: {
          db_data: jsonTR,
        },
      };
    case "de":
      const resDE = await fetch(process.env.server + "/api/data?lang=de");
      const jsonDE = await resDE.json();
      return {
        props: {
          db_data: jsonDE,
        },
      };
    case "en":
      const resEN = await fetch(process.env.server + "/api/data?lang=en");
      const jsonEN = await resEN.json();
      return {
        props: {
          db_data: jsonEN,
        },
      };

    default:
      const res = await fetch(process.env.server + "/api/data?lang=tr");
      const json = await res.json();
      return {
        props: {
          db_data: json,
        },
      };
  }
}
