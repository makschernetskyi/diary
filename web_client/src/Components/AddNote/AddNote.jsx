import React from 'react'

import { Header } from '../Header'
import styles from './AddNote.module.sass'




export const AddNote = () => {


  return (
    <>
    <Header backUrl='/notes'></Header>
    <div className={styles.Note}>
      <div className={styles.Note_Header}>
        <h2 className={styles.Note_Header_date}>
          <input type="datetime-local"/>
        </h2>
        <h2 className={styles.Note_Header_location}>
          <input type="text"/>
        </h2>
        <button className={styles.Note_Header_save}>save</button>
      </div>
      <div className={styles.Note_Content}>
        <textarea cols="30" rows="10"></textarea>
      </div>
    </div>
    </>
  )
}
