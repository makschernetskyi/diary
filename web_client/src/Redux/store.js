import { configureStore } from '@reduxjs/toolkit';
import { homeReducer } from './slices/home/homeSlice';
import { loginReducer } from './slices/login/loginSlice';
import { notesReducer } from './slices/notes/notesSlice';



const reducer = {
	login: loginReducer,
	home: homeReducer,
	notes: notesReducer
};


const store = configureStore({
	reducer
});

export {store};