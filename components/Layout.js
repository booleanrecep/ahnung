import React from "react";
import Head from "next/head";
import {Header,Navcol,WIPGear} from "./index"
export const Layout = React.memo(({children}) => {
  const [style, setStyle] = React.useState({ display: "flex" });
  return (
    <>
      <Head>
        <title>AHNUNG</title>
        <meta name="description" content="Coming soon.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
      <WIPGear/>
        <Header display={style.display} />
        <main className="main">
          <Navcol handleDisplay={setStyle} />
          <div className="content">{children}</div>
        </main>
        <footer className="footer">Here comes the footer</footer>
      </div>
    </>
  );
});
