import React from 'react';

import styles from './NotePreview.module.sass'



export const NotePreview = props => {

	const truncateTextTo = (text='',symbols) =>{
		if (text.length < symbols-3)
			return text+"..."
		return text.slice(0,symbols-3)+"..."
	}

	return(
		<>
			<article className={styles.NotePreview}>
				<h3>{props?.data?.date}</h3>
				
				<p>{truncateTextTo(props?.data?.text,40)}</p>
				<span className={styles.Corner_first}></span>
				<span className={styles.Corner_second}></span>
			</article>
		</>
	)
}

