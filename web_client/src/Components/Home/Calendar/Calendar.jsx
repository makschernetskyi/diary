import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Calendar.module.sass'
import { createCalendar } from './createCalendar'


export const Calendar = () => {
	const navigate = useNavigate()

	const handleCalendarClick = () => {
		navigate('/notes')
	}
	useEffect(()=>{
		createCalendar()
	})

	return (
		<div className={styles.Calendar} onClick = {handleCalendarClick}>
			<canvas id="Calendar_canvas" className={styles.Calendar_canvas} width="3500" height="3500"/>
		</div>
	)
}
