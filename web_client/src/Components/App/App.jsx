import * as React from 'react'
import styles from './App.module.sass'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Login } from '../Login';
import { Home } from '../Home'


export const App = () => {
	return (
		<div className={styles.App}>
			<Router>
				<Routes>
					<Route path="/" element={
						<Home/>
					}/>
					<Route exact path="/login" element={
						<Login/>
					}/>
					<Route path="*" element={"4o4 Not Found"}/>
				</Routes>
			</Router>
		</div>
	);
}
