import { Header } from "./Header";
import { Navcol } from "./Navcol";
import Head from "next/head";
import { getStaticProps } from "../pages/blog";

export const Layout = (props) => {
  return (
    <>
    
      <Head>
        <title>AHNUNG</title>
        <meta name="description" content="Coming soon.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <Header handleClick={props.handleClick}/>
        <main className="main">
          <Navcol />
          <div className="content">{props.children}</div>
        </main>
        <footer className="footer">Here comes the footer</footer>
      </div>
    </>
  );
};
