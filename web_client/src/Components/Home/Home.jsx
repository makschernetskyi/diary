import React, { useEffect } from 'react';
import { fetchLastNote } from '../../Redux/slices/home/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Header } from '../Header';

import styles from './Home.module.sass'



export const Home = () => {
	const {lastNote, error} = useSelector(state=> state.home);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const source = axios.CancelToken.source()
		dispatch(fetchLastNote(source))

		return ()=>{
			source.cancel()
		}
	}, [dispatch]);

	useEffect(()=>{
		if(error==="unauthorized"){
			window.location = '/login'
		}
	},[error])

	const handleCalendarClick = () => {
		navigate('/notes')
	}



	return (
		<>
		<Header/>
		<div className={styles.HomePage}>
			<div className={styles.Calendar} onClick = {handleCalendarClick}>
				Calendar template
			</div>
			<article className={styles.LastNote}>
				<h2>{lastNote?.date.slice(0,16)}</h2>
				<p>
					{lastNote?.text}	
				</p>
			</article>
		</div>
		</>
	);
}