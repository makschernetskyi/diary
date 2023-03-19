import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	passwordValue: ''
}


export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers:{
		updatePasswordValue: (state,action)=>{
			state.passwordValue = action.payload
			console.log(action.payload)
			return state
		}
	}
})

export const {updatePasswordValue} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;