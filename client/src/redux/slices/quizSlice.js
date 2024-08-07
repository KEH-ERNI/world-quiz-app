import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

export const getQuizzes = createAsyncThunk(
	'get/quizzes',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/Quiz');

			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getQuiz = createAsyncThunk(
	'get/quiz',
	async (quizId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/Quiz/${quizId}`);
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

export const editQuiz = createAsyncThunk(
	'edit/quiz',
	async ({ id, formData }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`/Quiz/${id}`, formData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const delQuiz = createAsyncThunk(
	'del/quiz',
	async (quizId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`/Quiz/${quizId}`);
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
		current: null,
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
			})
			.addCase(getQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(getQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.current = action.payload;
			})
			.addCase(getQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(delQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(delQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(delQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(editQuiz.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(editQuiz.fulfilled, (state, action) => {
				state.loading = false;

				if (state.data) {

					const index = state.data.findIndex(
						(quiz) => quiz.quizID === action.payload.quizID
					);
					if (index !== -1) {
						state.data[index] = action.payload;
					}
				}
			})
			.addCase(editQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const quizReducer = quizSlice.reducer;
