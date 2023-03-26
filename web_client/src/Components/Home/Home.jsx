import React, { useEffect } from 'react';
import { fetchLastNote } from '../../Redux/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
			navigate('/login')
		}
	},[error])



	return (
		<div>
			{JSON.stringify(lastNote)}
		</div>
	);
}