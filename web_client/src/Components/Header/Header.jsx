import React, { useEffect, useRef } from 'react'
import styles from './Header.module.sass'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';




export const Header = props => {

  const backRef = useRef();
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(props.backUrl){
      backRef.current.classList.remove(styles.hidden)
    }
  },[])

  const logout = async () => {
    try{
			await axios({
				url: '/api/v0/signin',
				method: 'put',
			})
      navigate('/login')
		}
		catch(err){
      if(err.response.status==401){
        navigate('/login')
      }
			alert(err.message)
		}
    
  }

  return (
    <header className={styles.Header}>
      <Link to={props?.backUrl} className={[styles.Header_back, styles.hidden].join(' ')} ref={backRef}>{'<'}</Link>
      <h1 className={styles.Header_title}>Diary</h1>
      <Link to="/newNote" className={styles.Header_newNote}>+</Link>
      <button className={styles.Header_logOut} onClick={logout}>🚪</button>
    </header>
  )
}
