import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

export const getQuizzes = createAsyncThunk(
	'get/quizzes',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/Quiz');
			console.log(response);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);
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
			.addCase(getQuizzes.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getQuizzes.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getQuizzes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
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
