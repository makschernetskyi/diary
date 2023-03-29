import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchNotes = createAsyncThunk(
	'fetchNotes',
	async (source, {rejectWithValue})=>{
		try{
			const response = await axios({
				url: '/api/v0/notes',
				method: 'get',
				cancelToken: source.token
			})
			console.log(response)
			return response.data
		}
		catch(err){
			if (err.response.status === 401){
				return rejectWithValue('unauthorized')
			}
			return rejectWithValue(err.message)
		}



	}
)

const initialState = {
	notesList: [],
	status: null,
	error: null
}

const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducer:{},
	extraReducers: builder=>{
		const {pending, fulfilled, rejected} = fetchNotes
		builder
		.addCase(pending, (state)=>{
			state.status = "pending";
		})
		.addCase(fulfilled, (state, action)=>{
			state.status = "resolved";
			state.notesList = action.payload
		})
		.addCase(rejected, (state, action)=>{
			state.status = "rejected"
			state.error = action.payload
		})
	}
})



export const notesReducer = notesSlice.reducer