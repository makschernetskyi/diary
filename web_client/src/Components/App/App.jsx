import * as React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Login } from '../Login';
import { Home } from '../Home'
import { Notes } from '../Notes';


export const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={
						<Home/>
					}/>
					<Route path="/notes" element={
						<Notes></Notes>
					}/>
					<Route exact path="/login" element={
						<Login/>
					}/>
					<Route path="*" element={"4o4 Not Found"}/>
				</Routes>
			</Router>	
		</>
	);
}
