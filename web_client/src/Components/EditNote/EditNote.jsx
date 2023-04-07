import React, { useEffect, useRef } from 'react'

import { Header } from '../Header'
import styles from './EditNote.module.sass'
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, resetState, updateDate, updateLocation, updateText } from '../../Redux/slices/editNote/editNoteSlice';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchNote } from '../../Redux/slices/editNote/editNoteSlice';




export const EditNote = () => {

  const dateInputRef = useRef();
  const locationInputRef = useRef();
  const contentInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page_location = useLocation();

  const {date, text, location, error, update_status} = useSelector(state=>state.editNote)
  
  const handleSubmit = () =>{
    const source = axios.CancelToken.source()
    const noteId = Number(page_location.pathname.split('/').pop())
    dispatch(updateNote({
      id: noteId,
      date: date,
      text: text,
      location: location,
      source: source
    }))
  }

  const handleDateInput = ()=>{
    dispatch(updateDate(dateInputRef.current.value))
  }
  const handleLocationInput = ()=>{
    dispatch(updateLocation(locationInputRef.current.value))
  }
  const handleTextInput = ()=>{
    dispatch(updateText(contentInputRef.current.value))
  }

  useEffect(()=>{
    if(error=="unauthorized")
      navigate('/login')
    return ()=>{
      dispatch(resetState())
    }
  },[error])

  useEffect(()=>{
    if(update_status=="resolved"){
      navigate('/notes')
    }
    return ()=>{
      dispatch(resetState())
    }
  },[update_status])

  useEffect(()=>{
    const source = axios.CancelToken.source()
    const noteId = Number(page_location.pathname.split('/').pop())
    if (isNaN(noteId)){
      navigate('/notFound')
    }
    dispatch(fetchNote({noteId:noteId, source: source}))
    return ()=>{
      source.cancel()
    }
  },[dispatch])



  return (
    <>
    <Header backUrl='/notes'></Header>
    <div className={styles.AddNote}>
      <div className={styles.AddNote_Header}> 
        <input type="datetime-local" className={styles.AddNote_Header_date} ref={dateInputRef} value={date} onChange={handleDateInput}/>
        <input type="text" placeholder="location..." className={styles.AddNote_Header_location} ref = {locationInputRef} value={location} onChange={handleLocationInput}/>
        <button className={styles.AddNote_Header_save} onClick={handleSubmit}>save</button>
      </div>
      <textarea value={text} onChange={handleTextInput} className={styles.AddNote_Content} ref={contentInputRef} placeholder='my new note...'>
      </textarea>
    </div>
    </>
  )
}
