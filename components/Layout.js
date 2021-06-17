import React from "react";
import Head from "next/head";
import { Header } from "./Header";
import { Navcol } from "./Navcol";
export const Layout = (props) => {
  const size = 30;
  const [style, setStyle] = React.useState({ display: "flex" });
  return (
    <>
      <Head>
        <title>AHNUNG</title>
        <meta name="description" content="Coming soon.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div
          style={{ position: "fixed", left: 10, width: "60px" }}
          title="The site is still under construction."
        >
          <img
            src="/static/gear-2.png"
            style={{
              animation: "spin 7s linear infinite",
              position: "fixed",
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `${size - 28}px`,
              marginTop: `${size - 25}px`,
            }}
          />
          <img
            src="/static/gear-2.png"
            style={{
              animation: "spin 7s linear infinite",
              position: "fixed",
              width: `${size - 6}px`,
              height: `${size - 6}px`,
              marginLeft: `${size + 11}px`,
              marginTop: `${size - 7}px`,
            }}
          />
          <img
            src="/static/gear-2.png"
            style={{
              animation: "spin 7s reverse  linear infinite",
              position: "fixed",
              width: `${size - 3}px`,
              height: `${size - 3}px`,
              marginLeft: `${size - 13}px`,
              marginTop: `${size - 4}px`,
            }}
          />
        </div>
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
