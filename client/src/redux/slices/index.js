export { register, login, authReducer } from './authSlice';

export {
	addQuiz,
	getQuizzes,
	getQuiz,
	delQuiz,
	editQuiz,
	quizReducer,
} from './quizSlice';

export {
	addQuestion,
	getQuestions,
	delQuestion,
	editQuestion,
	questionReducer,
} from './questionSlice';

export {
	addTakeQuiz,
	getTakeQuiz,
	delTakeQuiz,
	takeQuizReducer,
} from './takeQuizSlice';