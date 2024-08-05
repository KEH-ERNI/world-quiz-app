export { register, login, authReducer } from './authSlice';

export {
	addQuiz,
	getQuizzes,
	quizReducer,
	getQuiz,
	delQuiz,
	editQuiz,
} from './quizSlice';

export {
	addQuestion,
	getQuestions,
	delQuestion,
	questionReducer,
} from './questionSlice';
