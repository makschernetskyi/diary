import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
	lastNote:null,
	status: null,
	error: null
}

export const fetchLastNote = createAsyncThunk(
	'home/fetchLastNote',
	async (source, {rejectWithValue})=>{
		try{
			const response = await axios({
				url: '/api/v0/notes',
				method: 'get',
				cancelToken: source.token
			})
			if (response.data.length){
				return response.data[response.data.length-1]
			}else{
				return null
			}

			
		}
		catch(err){
			if (err.response.status === 401){
				return rejectWithValue('unauthorized')
			}
			return rejectWithValue(err.message)
		}



	}
)


const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers:{},
	extraReducers: builder =>{
		const {pending, fulfilled, rejected} = fetchLastNote
		builder
		.addCase(pending, (state)=>{
			state.status = "pending";
		})
		.addCase(fulfilled, (state, action)=>{
			state.status = "resolved";
			state.lastNote = action.payload
		})
		.addCase(rejected, (state, action)=>{
			state.status = "rejected"
			state.error = action.payload
		})
	}
})


export const homeReducer = homeSlice.reducer;