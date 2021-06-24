import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/Navcol.module.scss";
import { NavLink } from "./index";

export const Navcol = React.memo(({ handleDisplay }) => {
  const router = useRouter();
  const ref = React.createRef();
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
            "FOTOĞRAFLAR",
            "ADMİN",
          ],
        };
    }
  };
  const nav_text = React.useMemo(() => changeText(), [router.query.lang]);

  const handlePosition = () => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (ref.current.style.top = "0px")
      : (ref.current.style.top = "55px");
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, [router.query.lang, router.asPath]);
  return (
    <div className={styles.navcol}>
      <div className={styles.tabs} ref={ref}>
        <NavLink lang={router.query.lang} navbars={nav_text.navbars} />
      </div>
    </div>
  );
});
