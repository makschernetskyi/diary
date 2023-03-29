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


	return(
		<div className={styles.NotesPage}>
			<div className={styles.NotesPage_NotesPerDay}>
				<NotePreview data={notesList.length ? notesList[0] : {}}/>
			</div>
			
		</div>
	)
}

