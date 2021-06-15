import React from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const changeText = () => {
    switch (router.query.lang) {
      case "tr":
        return {
          lang: "tr",
          msg: "Ne ararsan bulunur, derde devadan gayrı!  < 404 />",
        };
      case "en":
        return {
          lang: "en",
          msg: "Soryy! There is no such a thing!  < 404 />",
        };

      case "de":
        return {
          lang: "de",
          msg: "Was du suchst ist nicht hier!  < 404 />",
        };

      default:
        return {
          lang: "tr",
          msg: "Ne ararsan bulunur, derde devadan gayrı! < 404 />",
        };
    }
  };
  const nav_text = React.useMemo(() => changeText(), [router.query.lang]);
  return (
    <h2
      style={{
        width: "fit-content",
        height: "fit-content",
        margin: " 20% auto",
        textAlign: "center",
      }}
    >
      {nav_text.msg}
    </h2>
  );
}
