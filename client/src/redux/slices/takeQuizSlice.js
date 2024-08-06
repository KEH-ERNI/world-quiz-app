import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

export const getTakeQuizzes = createAsyncThunk(
	'get/takeQuizzes',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/TakeQuiz');
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getTakeQuiz = createAsyncThunk(
	'get/takeQuiz',
	async (takeQuizId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/TakeQuiz/${takeQuizId}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const delTakeQuiz = createAsyncThunk(
	'del/takeQuiz',
	async (takeQuizId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(
				`/TakeQuiz/${takeQuizId}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const addTakeQuiz = createAsyncThunk(
	'add/takeQuiz',
	async (dataFormat, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/TakeQuiz', dataFormat);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const takeQuizSlice = createSlice({
	name: 'takeQuiz',
	initialState: {
		loading: false,
		current: null,
		data: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTakeQuizzes.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTakeQuizzes.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getTakeQuizzes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addTakeQuiz.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addTakeQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(addTakeQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getTakeQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTakeQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.current = action.payload;
			})
			.addCase(getTakeQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(delTakeQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(delTakeQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(delTakeQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const takeQuizReducer = takeQuizSlice.reducer;
