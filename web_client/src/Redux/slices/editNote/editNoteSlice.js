import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialTime = (new Date(Date.now()-new Date(Date.now()).getTimezoneOffset()*60*1000)).toISOString()
const initialState = {
	date: initialTime.slice(0,16),
	location: '',
	text: '',
	fetch_status: null,
	update_status: null,
	error: null
};

export const fetchNote = createAsyncThunk(
	'editNote/fetchNote',
	async (reqData, {rejectWithValue})=>{
		try{
			const response = await axios({
				url: `/api/v0/note/${reqData.noteId}`,
				method: 'get',
				cancelToken: reqData.source.token
			})
			return response.data
		}
		catch(err){
			console.log(err)
			if (err.response.status === 401){
				return rejectWithValue('unauthorized')
			}
			return rejectWithValue(err.message)
		}
	}
)

export const updateNote = createAsyncThunk(
	'editNote/updateNote',
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
				url: `/api/v0/note/${params.id}`,
				method: 'put',
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


export const editNoteSlice = createSlice({
	name: 'editNote',
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
		builder
		.addCase(updateNote.pending, (state)=>{
			state.update_status = "pending";
		})
		.addCase(updateNote.fulfilled, (state, action)=>{
			state.update_status = "resolved";
			state.note = action.payload
		})
		.addCase(updateNote.rejected, (state, action)=>{
			state.update_status = "rejected"
			state.error = action.payload
		})
		.addCase(fetchNote.pending, (state)=>{
			state.status = "pending";
		})
		.addCase(fetchNote.fulfilled, (state, action)=>{
			state.status = "resolved";
			state.location = action.payload.location
			state.text = action.payload.text
			state.date = new Date(Date.parse(action.payload.date)).toISOString().slice(0,16)
		})
		.addCase(fetchNote.rejected, (state, action)=>{
			state.status = "rejected"
			state.error = action.payload
		})
	}
})

export const {updateDate, updateLocation, updateText, resetState} = editNoteSlice.actions;

export const editNoteReducer = editNoteSlice.reducer;