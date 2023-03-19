import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './slices/login/loginSlice';


const reducer = {
	login: loginReducer
};


const store = configureStore({
	reducer
});

export {store};