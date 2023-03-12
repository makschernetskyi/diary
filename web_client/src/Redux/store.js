import { configureStore } from '@reduxjs/toolkit';
import { indexReducer } from './reducers/indexReducer';


const reducer = {
	index: indexReducer
};


const store = configureStore({
	reducer
});

export {store};