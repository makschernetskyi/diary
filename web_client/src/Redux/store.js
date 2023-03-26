import { configureStore } from '@reduxjs/toolkit';
import { homeReducer } from './slices/homeSlice';
import { loginReducer } from './slices/login/loginSlice';



const reducer = {
	login: loginReducer,
	home: homeReducer
};


const store = configureStore({
	reducer
});

export {store};