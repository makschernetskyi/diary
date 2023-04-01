import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { fetchNote, resetState } from '../../Redux/slices/note/noteSlice';

import { Header } from '../Header'
import styles from './Note.module.sass'




export const Note = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {note, error} = useSelector(state=>state.note)
  const source = axios.CancelToken.source()

  useEffect(() => {
    const noteId = Number(location.pathname.split('/').pop())
    if (isNaN(noteId)){
      navigate('/notFound')
    }
    dispatch(fetchNote({noteId:noteId, source: source}))
  
    return ()=>{
			source.cancel()
      dispatch(resetState())
		}
  }, [dispatch])

  useEffect(()=>{
		if(error==="unauthorized"){
			window.location = '/login'
		}
	},[error])
  

  return (
    <>
    <Header backUrl='/notes'></Header>
    <div className={styles.Note}>
      <div className={styles.Note_Header}>
        <h2 className={styles.Note_Header_date}>
          {note?.date.slice(0,16)}
        </h2>
        <h2 className={styles.Note_Header_location}>
          {note?.location || "unknown location"}
        </h2>
        <button className={styles.Note_Header_edit}>edit</button>
        <button className={styles.Note_Header_delete}>del</button>
      </div>
      <div className={styles.Note_Content}>
        &emsp;
        {note?.text}
      </div>
    </div>
    </>
  )
}
