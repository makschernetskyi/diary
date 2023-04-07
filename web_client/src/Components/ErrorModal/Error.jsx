import React, { useEffect, useRef } from 'react'
import styles from './Error.module.sass'


export const Error = props => {
	const errorRef = useRef()
	const handleCloseClick = () =>{
		errorRef.current.classList.add(styles.hidden)
	}

	useEffect(()=>{

		if(props.message){
			errorRef.current.classList.remove(styles.hidden)
		}

		return ()=>{
			if(errorRef.current && !errorRef.current.classList.contains(styles.hidden))
				errorRef.current.classList.add(styles.hidden)
		}
	})

	return (
		<div className={[styles.Error,styles.hidden].join(' ')} ref={errorRef}>
			<h6 className={styles.Error_header}>Error has occured</h6>
			<p className={styles.Error_message}>{props?.message}</p>
			<span className={styles.Error_close} onClick={handleCloseClick}>x</span>
		</div>
  )
}
