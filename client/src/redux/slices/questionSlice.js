import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

export const getQuestions = createAsyncThunk(
	'get/questions',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/Question');
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const addQuestion = createAsyncThunk(
	'add/question',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/Question', data);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getQuestion = createAsyncThunk(
	'get/question',
	async (quizId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/Question/${quizId}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const delQuestion = createAsyncThunk(
	'del/question',
	async (questionId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(
				`/Question/${questionId}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const editQuestion = createAsyncThunk(
	'edit/question',
	async ({ questionId, updatedData }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(
				`/Question/${questionId}`,
				updatedData
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const questionSlice = createSlice({
	name: 'question',
	initialState: {
		loading: false,
		current: false,
		data: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getQuestions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getQuestions.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getQuestions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addQuestion.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(addQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getQuestion.fulfilled, (state, action) => {
				state.loading = false;
				state.current = action.payload;
			})
			.addCase(getQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(delQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(delQuestion.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(delQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(editQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(editQuestion.fulfilled, (state, action) => {
				state.loading = false;
				if (state.data) {
					const index = state.data.findIndex(
						(question) => question.id === action.payload.id
					);
					if (index !== -1) {
						state.data[index] = action.payload;
					}
				}
			})
			.addCase(editQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const questionReducer = questionSlice.reducer;
