import React, { useEffect } from 'react';
import { fetchLastNote } from '../../Redux/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import styles from './Home.module.sass'


export const Home = () => {
	const {lastNote, error} = useSelector(state=> state.home);
	const dispatch = useDispatch();
	//const navigate = useNavigate();

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



	return (
		<div className={styles.HomePage}>
			<div className={styles.Calendar}>
				Calendar template
			</div>
			<article className={styles.LastNote}>
				<h2>{lastNote?.date}</h2>
				<p>{lastNote?.text}</p>
			</article>
		</div>
	);
}