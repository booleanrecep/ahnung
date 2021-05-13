// import About from "./about";
import  {Header} from "./Header" 
import  {Navcol} from "./Navcol" 
import  {MetaHead} from "./MetaHead" 
import  {Footer} from "./Footer" 
export const Layout=(props)=> {
  return (
    <>
      <MetaHead />
      <div>
        <Header />
        <main className="main">
          <Navcol />
          <div className="content">
            {props.children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}