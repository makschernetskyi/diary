import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Login.module.sass'

import { updatePasswordValue } from '../../Redux/slices/login/loginSlice';



export const Login = () => {
	const {passwordValue} = useSelector((state)=>state.login);
	const dispatch = useDispatch();

	const passwordInputRef = React.createRef()

	const handleInputChange = () =>{
		dispatch(updatePasswordValue(passwordInputRef.current.value))
	}



	return (
		<div className={styles.LoginPage}>
			<form action="" className={styles.LoginForm}>
				<label className={styles.LoginForm_header}>
					Type password to sign in:
				</label>
				<input type="password" className={styles.LoginForm_passwordInput} ref = {passwordInputRef} onChange = {handleInputChange} value = {passwordValue} required/>
				<button type="submit" className={styles.LoginForm_submit}>sign in</button>
			</form>
		</div>
	);
}
