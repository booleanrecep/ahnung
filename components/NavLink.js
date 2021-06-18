import React from "react";
import Link from "next/link";
export const NavLink = React.memo(({ lang, navbars }) => {
  const links = [
    { name: "about", navbar: navbars[0] },
    { name: "blog", navbar: navbars[1] },
  ].map(({ name, navbar }) => (
    <Link
      href={`/${name.toLowerCase()}?lang=${lang === undefined ? "tr" : lang}`}
      passHref
      key={navbar}
    >
      <div>{navbar}</div>
    </Link>
  ));
  return <>{links}</>;
});
