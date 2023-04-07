import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialTime = (new Date(Date.now()-new Date(Date.now()).getTimezoneOffset()*60*1000)).toISOString()
const initialState = {
	date: initialTime.slice(0,16),
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
			console.log(new Date(Date.parse(date)).toISOString())
			requestData.append('date', new Date(Date.parse(date)).toISOString())
			if (location){
				requestData.append('location', location)
			}
			requestData.append('text', text)

			const response = await axios({
				url: '/api/v0/notes',
				method: 'post',
				headers: { 
					"Content-Type": "multipart/form-data",
					'Datetime-Format': "ISO" 
				},
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
			state.date = action.payload
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