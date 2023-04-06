import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
	passwordValue: '',
	token: '',
	status: null,
	error: null
};

export const attemptLogin = createAsyncThunk(
	'login/attemptLogin',
	async (params, {rejectWithValue}) => {
		const {password, source} = params
		try{
			const requestData = new FormData();
			requestData.append('password', password)
			const response = await axios({
				url: '/api/v0/signin',
				method: 'post',
				headers: { "Content-Type": "multipart/form-data" },
				data: requestData,
				cancelToken: source.token
			})
			if(response.status !== 200){
				throw new Error('serverError')
			}
			return response.data.token
		}
		catch(err){
			return rejectWithValue(err.message)
		}
		
	}

);



export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers:{
		updatePasswordValue: (state,action)=>{
			state.passwordValue = action.payload;
			return state;
		}
	},
	extraReducers:{
		[attemptLogin.pending]: (state) => {
			state.status = 'pending';
			state.error = null;
		},
		[attemptLogin.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.token = action.payload
		},
		[attemptLogin.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export const {updatePasswordValue} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;