import React from "react";
import Head from "next/head";
import { Header } from "./Header";
import { Navcol } from "./Navcol";

export const Layout = (props) => {
  const [style, setStyle] = React.useState({ display: "flex" });
  return (
    <>
      <Head>
        <title>AHNUNG</title>
        <meta name="description" content="Coming soon.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <Header display={style.display} />
        <main className="main">
          <Navcol handleDisplay={setStyle} />
          <div className="content">{props.children}</div>
        </main>
        <footer className="footer">Here comes the footer</footer>
      </div>
    </>
  );
};
