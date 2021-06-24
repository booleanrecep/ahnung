import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/Navcol.module.scss";
import { NavLink } from "./index";

export const Navcol = React.memo(({ handleDisplay }) => {
  const router = useRouter();
  const changeText = () => {
    switch (router.query.lang) {
      case "tr":
        return {
          lang: "tr",
          navbars: [
            "HAKKIMDA",
            [
              "BLOG",
              <b key="blog-pop" className="article-created">
                ✔
              </b>,
            ],
            "GALERİ",
            "ADMİN",
          ],
        };
      case "en":
        return {
          lang: "en",
          navbars: [
            "ABOUT",
            [
              "BLOG",
              <b key="blog-pop" className="article-created">
                ✔
              </b>,
            ],
            "GALLERY",
            "ADMIN",
          ],
        };

      case "de":
        return {
          lang: "de",
          navbars: [
            "ÜBER MICH",
            [
              "BLOG",
              <b key="blog-pop" className="article-created">
                ✔
              </b>,
            ],
            "GALLERIE",
            "ADMIN",
          ],
        };

      default:
        return {
          lang: "tr",
          navbars: [
            "HAKKIMDA",
            [
              "BLOG",
              <b key="blog-pop" className="article-created">
                ✔
              </b>,
            ],
            "GALERİ",
            "ADMİN",
          ],
        };
    }
  };
  const nav_text = React.useMemo(() => changeText(), [router.query.lang]);

 
  React.useEffect(() => {
    const handlePosition = () => {
      const div= document.querySelector(`.${styles.tabs}`)
      window.pageYOffset > 50 && window.innerWidth > 768
        ? (div.style.top = "0px")
        : (div.style.top = "55px");
    };
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, [router.query.lang, router.asPath]);
  return (
    <div className={styles.navcol}>
      <div className={styles.tabs} >
        <NavLink lang={router.query.lang} navbars={nav_text.navbars} />
      </div>
    </div>
  );
});
