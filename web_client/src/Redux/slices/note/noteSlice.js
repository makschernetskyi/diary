import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchNote = createAsyncThunk('fetchNote',
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
			if (err.response.status === 401){
				return rejectWithValue('unauthorized')
			}
			return rejectWithValue(err.message)
		}
	}
)

export const deleteNote = createAsyncThunk('deleteNote',
	async (noteId, {rejectWithValue})=>{
		try{
			const response = await axios({
				url: `/api/v0/note/${noteId}`,
				method: 'delete',
			})
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
	note: null,
	status: null,
	error: null,
	deleted: false
}



const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers:{
		resetState: ()=>{
			return initialState
		}
	},
	extraReducers: builder =>{
		const {pending, fulfilled, rejected} = fetchNote
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

		builder
		.addCase(deleteNote.pending, (state)=>{
			state.status = "pending";
		})
		.addCase(deleteNote.fulfilled, (state)=>{
			state.status = "resolved";
			state.deleted = true
		})
		.addCase(deleteNote.rejected, (state, action)=>{
			state.status = "rejected"
			state.error = action.payload
		})

		
	}
})

export const {resetState} = noteSlice.actions;

export const noteReducer = noteSlice.reducer