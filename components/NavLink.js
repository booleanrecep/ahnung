import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {changeUIText} from "../helpers/routeState"

export const NavLink = React.memo(() => {
  const router = useRouter();

  const routeState = React.useMemo(() => changeUIText(router.query.lang), [router.query.lang]);
  const {navbars} = routeState;
  return <>{ navbars.map(({query,title})=>{
    return(
      <Link
      href={`/${query}?lang=${router.query.lang === undefined ? "tr" : router.query.lang}`}
      passHref
      key={query}
    >
      <div>{title}</div>
    </Link>
    )
  })}</>;
})
