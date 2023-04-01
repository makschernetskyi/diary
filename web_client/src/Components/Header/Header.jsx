import React from 'react'
import styles from './Header.module.sass'
import { Link } from 'react-router-dom'




export const Header = () => {
  return (
    <header className={styles.Header}>
      <h1 className={styles.Header_title}>Diary</h1>
      <Link to="/newNote" className={styles.Header_newNote}>+</Link>
      <button className={styles.Header_logOut}>🚪</button>
    </header>
  )
}
