import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Login.module.sass'

import { attemptLogin, updatePasswordValue } from '../../Redux/slices/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const Login = () => {
	const {passwordValue, status, error} = useSelector((state)=>state.login);
	
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
		if(status=='resolved'){
			navigate('/')
		}
	}, [status]);

	useEffect(()=>{
		return ()=>{
			source.cancel()
		}
	},[])

	return (
		<div className={styles.LoginPage}>
			<form className={styles.LoginForm} onSubmit = {handleSumbit}>
				<label className={styles.LoginForm_header}>
					Type password to sign in:
				</label>
				<input type="password" className={styles.LoginForm_passwordInput} ref = {passwordInputRef} onChange = {handleInputChange} value = {passwordValue} required/>
				<button type="submit" className={styles.LoginForm_submit}>sign in</button>
				{error ? <p className={styles.LoginForm_error}>wrong login data</p>:''}
			</form>
		</div>
	);
}
