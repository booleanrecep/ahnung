import React from 'react';
import styles from '../styles/components/Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showDeutsch, showTurkish, showEnglish,showDatas } from '../state/reducers';
// const ss=window.pageYOffset
import Link from 'next/link';

export const Header = () => {
  const state = useSelector(state => state);

  const ref = React.createRef();
  const dispatch = useDispatch();
  const objStyle1 = {
    transform: 'rotate(90deg)',
    margin: '50px -30px 0 0'
  };
  const objStyle2 = {
    transform: 'rotate(0deg)',
    margin: '10px'
  };
  const childStyle1 = {
    transform: 'rotate(-90deg)'
  };
  const childStyle2 = {
    transform: 'rotate(0deg)'
  };
  const objStyles = (obj, sty) => {
    Object.assign(obj.style, sty);
  };
  const chldStyles = (chldArr, sty) => {
    Array.prototype.slice
      .call(chldArr)
      .map(chl => Object.assign(chl.style, sty));
  };
  const handlePosition = React.useCallback(() => {
    window.pageYOffset > 50 && window.innerWidth > 768
      ? (objStyles(ref.current, objStyle1),
        chldStyles(ref.current.children, childStyle1))
      : (objStyles(ref.current, objStyle2),
        chldStyles(ref.current.children, childStyle2));
  }, [ref, state]);

  React.useEffect(() => {
    window.addEventListener('scroll', handlePosition);
    return () => {
      window.removeEventListener('scroll', handlePosition);
    };
  }, [ref, state]);
  return (
    <header className={`${styles.header}`}>
      <div id="lang" ref={ref}>
        <a onClick={() => dispatch(showTurkish())}>TR</a>
        <a onClick={() => dispatch(showEnglish())}>EN</a>
        <a onClick={() => dispatch(showDeutsch())}>DE</a>
        <a onClick={() => dispatch(showDatas())}>DEs</a>
      </div>
    </header>
  );
};
