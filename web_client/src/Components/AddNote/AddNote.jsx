import React, { useEffect, useRef } from 'react'

import { Header } from '../Header'
import { Error } from '../ErrorModal';
import styles from './AddNote.module.sass'
import { useDispatch, useSelector } from 'react-redux';
import { postNote, resetState, updateDate, updateLocation, updateText } from '../../Redux/slices/addNote/addNoteSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export const AddNote = () => {

  const dateInputRef = useRef();
  const locationInputRef = useRef();
  const contentInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {date, text, location, error, status} = useSelector(state=>state.addNote)
  
  const handleSubmit = () =>{
    const source = axios.CancelToken.source()
    dispatch(postNote({
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
  },[error])

  useEffect(()=>{
    if(status=="resolved"){
      navigate('/notes')
    }
  },[status])

  useEffect(()=>{
    return ()=>{
      dispatch(resetState())
    }
  },[])



  return (
    <>
    <Header backUrl='/notes'></Header>
    <div className={styles.AddNote}>
      <div className={styles.AddNote_Header}> 
        <input type="datetime-local" className={styles.AddNote_Header_date} ref={dateInputRef} value={date} onChange={handleDateInput}/>
        <input type="text" placeholder="location..." className={styles.AddNote_Header_location} ref = {locationInputRef} value={location} onChange={handleLocationInput}/>
        <button className={styles.AddNote_Header_save} onClick={handleSubmit}>save</button>
      </div>
      <textarea value={text} onChange={handleTextInput} className={styles.AddNote_Content} ref={contentInputRef} placeholder='my new note...' autoFocus>
      </textarea>
    </div>
    <Error message={error?'wrong login data':''}/>
    </>
  )
}
