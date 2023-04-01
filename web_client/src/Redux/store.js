import { configureStore } from '@reduxjs/toolkit';
import { homeReducer } from './slices/home/homeSlice';
import { loginReducer } from './slices/login/loginSlice';
import { notesReducer } from './slices/notes/notesSlice';
import { noteReducer } from './slices/note/noteSlice';



const reducer = {
	login: loginReducer,
	home: homeReducer,
	notes: notesReducer,
	note: noteReducer
};


const store = configureStore({
	reducer
});

export {store};