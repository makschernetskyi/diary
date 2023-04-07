import React from 'react';
import { Link } from 'react-router-dom'

import styles from './NotePreview.module.sass'



export const NotePreview = props => {

	const truncateTextTo = (text='',symbols) =>{
		if (text.length < symbols-3)
			return text+"..."
		return text.slice(0,symbols-3)+"..."
	}

	const getPlaceHolderOrText = (text) =>{
		if(text){
			return(
				<p>{truncateTextTo(text,40)}</p>
			)
		}
		return(
			<div className={styles.textPlaceHolder}/>
		)
	}
	const getPlaceHolderOrHeader = (header) =>{
		if(header){
			return(
				<h3>{header}</h3>
			)
		}
		return(
			<div className={styles.headerPlaceHolder}/>
		)
	}

	return(
		<>
			<Link to={`/note/${props.id}`} className={styles.NotePreview}>
				{getPlaceHolderOrHeader(props.date.slice(11,16))}
				{getPlaceHolderOrText(props.text)}
				<span className={styles.Corner_first}></span>
				<span className={styles.Corner_second}></span>
			</Link>
		</>
	)
}

