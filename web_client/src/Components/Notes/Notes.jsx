import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import styles from './Notes.module.sass'
import { fetchNotes } from '../../Redux/slices/notes/notesSlice';
import { NotePreview } from './NotePreview';




export const Notes = () => {

	const {notesList, error} = useSelector((state)=>state.notes);
	const dispatch = useDispatch();
	const source = axios.CancelToken.source()

	useEffect(() => {
		dispatch(fetchNotes(source))

		return () => {
			source.cancel()
		};
	}, [dispatch]);

	useEffect(()=>{
		if(error==="unauthorized"){
			window.location = '/login'
		}
	}, [error])


	const getPreparedDateFromNote = (note) =>{
		const date = new Date(Date.parse(note.date));
		date.setHours(0)
		date.setMinutes(0)
		date.setSeconds(0)
		date.setMilliseconds(0)
		return JSON.stringify(date)
	}

	const groupArray = (originalArr, prepFunc) =>{
		const result = []
		let last = null
		const arr = [...originalArr]
		arr.sort((a,b)=>{
			const prop_value_a = prepFunc(a)
			const prop_value_b = prepFunc(b)
			if (prop_value_a < prop_value_b)
				return -1;
			return 0;
		})
		
		
		arr.forEach(e=>{
			if (prepFunc(e) != last){
				result.push([e])
				last = prepFunc(e)
			}else{
				result[result.length-1].push(e)
			}
		})
		return result
	}

	const generateNotesSection = (groupOfNotes, key) =>{
		const notesList = []
		for(let note of groupOfNotes){
			notesList.push(<NotePreview key={note.id} date={note.date} text ={note.text} location={note.location}/>)
		}
		return(
			<div className={styles.NotesPage_NotesSection} key={key}>
				{notesList}
			</div>
		)
	}
	const generateNotesSections = (notesList)=>{
		const groupedNotesData = groupArray(notesList, getPreparedDateFromNote)
		const sections = []
		let key = 0
		for(let group of groupedNotesData){
			sections.push(generateNotesSection(group,key))
			sections.push(<hr key={Math.ceil(Math.random()*1000)}/>)
			key++;
		}
		return sections
	}


	return(
		<div className={styles.NotesPage}>
			{generateNotesSections(notesList)}
		</div>
	)
}

