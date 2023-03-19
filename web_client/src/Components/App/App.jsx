import * as React from 'react'
import styles from './App.module.sass'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Login } from '../Login';


export const App = () => {
	return (
		<div className={styles.App}>
			<Router>
				<Routes>
					<Route path="/" element={"hello index"}/>
					<Route exact path="/login" element={
						<Login/>
					}/>
					<Route path="*" element={"4o4 Not Found"}/>
				</Routes>
			</Router>
		</div>
	);
}
