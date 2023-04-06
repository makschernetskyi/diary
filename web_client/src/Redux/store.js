import { configureStore } from '@reduxjs/toolkit';
import { homeReducer } from './slices/home/homeSlice';
import { loginReducer } from './slices/login/loginSlice';
import { notesReducer } from './slices/notes/notesSlice';
import { noteReducer } from './slices/note/noteSlice';
import { addNoteReducer } from './slices/addNote/addNoteSlice';



const reducer = {
	login: loginReducer,
	home: homeReducer,
	notes: notesReducer,
	note: noteReducer,
	addNote: addNoteReducer
};


const store = configureStore({
	reducer
});

export {store};