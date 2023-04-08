import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Login.module.sass'

import { attemptLogin, updatePasswordValue } from '../../Redux/slices/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {Error} from '../ErrorModal'



export const Login = () => {
	const {passwordValue, status, error} = useSelector((state)=>state.login);
	
	const [time, setTime] = useState(new Date(Date.now()).toTimeString().slice(0,5))

	const source = axios.CancelToken.source()

	const dispatch = useDispatch();

	const navigate = useNavigate()

	const passwordInputRef = React.createRef()

	const handleInputChange = () =>{
		dispatch(updatePasswordValue(passwordInputRef.current.value))
	}

	const handleSumbit = event =>{
		event.preventDefault();
		console.log('hello sweetie')
		dispatch(attemptLogin({
			password: passwordValue, source: source
		}));
	}

	useEffect(() => {
		const clock = setInterval(()=>{
			setTime(new Date(Date.now()).toTimeString().slice(0,5))
		},60000)

		if(status=='resolved'){
			clearInterval(clock)
			navigate('/')
		}
	}, [status]);

	useEffect(()=>{
		return ()=>{
			source.cancel()
		}
	},[])

	return (
		<>
		<div className={styles.LoginPage}>
			<form className={styles.LoginForm} onSubmit = {handleSumbit}>
				<label className={styles.LoginForm_header}>
					Type password to sign in:
				</label>
				<input type="password" className={styles.LoginForm_passwordInput} ref = {passwordInputRef} onChange = {handleInputChange} value = {passwordValue} placeholder="...password" required/>
				<button type="submit" className={styles.LoginForm_submit}>sign in</button>
			</form>
			<div className={styles.LoginPage_Clock}>{time}</div>
		</div>
		<Error message={error?'wrong login data':''}/>
		</>
	);
}
