import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

export const addQuiz = createAsyncThunk(
	'add/quiz',
	async (formData, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/Quiz', formData);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const quizSlice = createSlice({
	name: 'quiz',
	initialState: {
		loading: false,
		data: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addQuiz.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(addQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const quizReducer = quizSlice.reducer;
