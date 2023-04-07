import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Calendar.module.sass'
import { createCalendar } from './createCalendar'


export const Calendar = () => {

	useEffect(()=>{
		createCalendar()
	})

	return (
		<Link to='notes' className={styles.Calendar}>
			<canvas id="Calendar_canvas" className={styles.Calendar_canvas} width="3500" height="3500"/>
		</Link>
	)
}
