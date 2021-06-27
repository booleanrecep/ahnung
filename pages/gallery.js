import styles from "../styles/pages/gallery.module.scss";
import { githubSvg, goToSiteSvg } from "../components/svg/index";
const images = [
  {
    src: "/static/fake_keep.png",
    github: "https://github.com/booleanrecep/fake_keep",
    preview: "https://pure-ravine-98958.herokuapp.com/",
    title: "Todo App (MERN)",
  },
  {
    src: "/static/github_clone.png",
    github: "https://github.com/booleanrecep/github_clone",
    preview: "https://github-clone-booleanrecep.vercel.app/",
    title: "GitHub Clone",
  },
  {
    src: "/static/odevne.png",
    github: "https://github.com/booleanrecep/odevne",
    preview: "https://odevne.netlify.app/",
    title: "Homework App (CRUD)",
  },
];

export default function Gallery() {
  let cat;
  const handlePlayMouseOver=()=>{
    cat.play()
  }
  const handlePauseMouseOut=()=>{
    cat.pause()
    cat.currentTime=0
  }
  return (
    <>
      <div className={styles.title}>
        <h2>PROJECTS</h2>
      </div>
      <div className={styles.gallery}>
        {images.map(({ src, github, preview, title }) => {
          return (
            <div className={styles.photos}>
              <div className={styles.image}>
                <img src={src} title={title} />
              </div>
              <div className={styles.tools}>
                <a target="_blank" href={preview}>
                  {goToSiteSvg}
                </a>
                <a target="_blank" href={github}>
                  <span onMouseOver={handlePlayMouseOver} onMouseOut={handlePauseMouseOut} >
                    <audio ref={el=>cat=el}>
                      <source src="/static/meow.ogg" type="audio/ogg" />
                    </audio>
                    {githubSvg}
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
