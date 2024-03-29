import * as React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Login } from '../Login';
import { Home } from '../Home'
import { Notes } from '../Notes';
import { Note } from '../Note';
import { AddNote } from '../AddNote';
import { EditNote } from '../EditNote';


export const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={
						<Home/>
					}/>
					<Route exact path="/notes" element={
						<Notes/>
					}/>
					<Route exact path="/login" element={
						<Login/>
					}/>
					<Route exact path="/newNote" element={
						<AddNote/>
					}/>
					<Route exact path="/editNote/*" element={
						<EditNote/>
					}/>
					<Route exact path="/note/*" element={
						<Note/>
					}/>
					<Route path="*" element={"4o4 Not Found"}/>
				</Routes>
			</Router>	
		</>
	);
}
