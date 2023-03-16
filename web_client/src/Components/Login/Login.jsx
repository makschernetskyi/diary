import React from 'react';
import styles from './Login.module.sass'


export const Login = () => {
	return (
		<div className={styles.LoginPage}>
			<form action="" className={styles.LoginForm}>
				<label className={styles.LoginForm_header}>
					Type password to sign in:
				</label>
				<input type="password" className={styles.LoginForm_passwordInput} required/>
				<button type="submit" className={styles.LoginForm_submit}>sign in</button>
			</form>
		</div>
	);
}
