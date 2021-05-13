// import About from "./about";
import  {Header} from "./Header" 
import  {Navcol} from "./Navcol" 
import  {MetaHead} from "./MetaHead" 
export const Layout=(props)=> {
  return (
    <>
      <MetaHead />
      <div className="container">
        <Header />
        <main className="main">
          <Navcol />
          <div className="content">
            {props.children}
          </div>
        </main>
        <footer className="footer">Here comes the footer</footer>
      </div>
    </>
  );
}