import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
	date: new Date(Date.now()).toISOString(),
	location: '',
	text: '',
	status: null,
	error: null
};

export const postNote = createAsyncThunk(
	'addNote/postNote',
	async (params, {rejectWithValue}) => {
		const {date, location, text ,source} = params
		try{
			const requestData = new FormData();
			requestData.append('date', new Date(Date.parse(date)).toISOString())
			if (location)
				requestData.append('location', location)
			requestData.append('text', text)

			const response = await axios({
				url: '/api/v0/notes',
				method: 'post',
				headers: { "Content-Type": "multipart/form-data", "datetime_format": "ISO" },
				data: requestData,
				cancelToken: source.token
			})
			if(response.status !== 200){
				throw new Error('serverError')
			}
			return response.data.token
		}
		catch(err){
			if (err.response.status === 401){
				return rejectWithValue('unauthorized')
			}
			return rejectWithValue(err.message)
		}
		
	}

);


export const addNoteSlice = createSlice({
	name: 'addNote',
	initialState,
	reducers:{
		updateDate: (state, action) => {
			state.date = new Date(Date.parse(action.payload)).toISOString()
			console.log(state.date)
			return state
		},
		updateLocation: (state, action) => {
			state.location = action.payload
			return state
		},
		updateText: (state, action) => {
			state.text = action.payload
			return state
		},
		resetState: (state) => {
			state = initialState
			return state
		}

	},
	extraReducers: builder =>{
		const {pending, fulfilled, rejected} = postNote
		builder
		.addCase(pending, (state)=>{
			state.status = "pending";
		})
		.addCase(fulfilled, (state, action)=>{
			state.status = "resolved";
			state.note = action.payload
		})
		.addCase(rejected, (state, action)=>{
			state.status = "rejected"
			state.error = action.payload
		})
	}
})

export const {updateDate, updateLocation, updateText, resetState} = addNoteSlice.actions;

export const addNoteReducer = addNoteSlice.reducer;