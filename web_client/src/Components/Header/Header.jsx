import React, { useEffect, useRef } from 'react'
import styles from './Header.module.sass'
import { Link } from 'react-router-dom'




export const Header = props => {

  const backRef = useRef();
  
  useEffect(()=>{
    if(props.backUrl){
      backRef.current.classList.remove(styles.hidden)
    }
  },[])

  return (
    <header className={styles.Header}>
      <Link to={props?.backUrl} className={[styles.Header_back, styles.hidden].join(' ')} ref={backRef}>{'<'}</Link>
      <h1 className={styles.Header_title}>Diary</h1>
      <Link to="/newNote" className={styles.Header_newNote}>+</Link>
      <button className={styles.Header_logOut}>🚪</button>
    </header>
  )
}
