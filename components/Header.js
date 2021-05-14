import React from "react"
import styles from "../styles/components/Header.module.scss";
import { useDispatch } from 'react-redux'
import { showDeutsch, showTurkish,showEnglish } from '../state/reducers'
// const ss=window.pageYOffset
export const Header = () => {
 
  const dispatch = useDispatch()
  const ref = React.createRef()
 console.log(ref.current)
 const handlePosition=()=>{
  return window.pageYOffset>50?ref.current.style.flexDirection="column":ref.current.style.flexDirection="row"
 }
 React.useEffect(()=>{
 
  console.log(ref.current)
  window.addEventListener("scroll", handlePosition);
  return () => {
    window.removeEventListener("scroll", handlePosition);
  };
 },[])
  return (
  <header className={`${styles.header}`}>
    <div ref={ref}>
      <a  onClick={() => dispatch(showTurkish())}>TR</a>
      <a onClick={() => dispatch(showEnglish())}>EN</a>
      <a onClick={() => dispatch(showDeutsch())}>DE</a>
    </div>
  </header>
)
  };
