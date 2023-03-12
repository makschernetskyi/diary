import * as React from 'react'
import styles from './App.module.sass'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


export const App = () => {
	return (
		<div className={styles.App}>
			<Router>
				<Routes>
					<Route path="/" element={"hello router"}/>
					<Route exact path="/login" element={"login"}/>
					<Route path="*" element={"4o4 Not Found"}/>
				</Routes>
			</Router>
		</div>
	);
}
