import React from "react";
import Head from "next/head";
import { Header, Navcol, WIPGear } from "./index";
export const Layout = ({ children }) => {
  console.log("LLLLayout");
  return (
    <>
      <Head>
        <title>AHNUNG</title>
        <meta name="description" content="Coming soon.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <WIPGear />
        <Header />
        <main className="main">
          <Navcol />
          <div className="content">{children}</div>
        </main>
        <footer className="footer">Here comes the footer</footer>
      </div>
    </>
  );
};
