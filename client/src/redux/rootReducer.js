import { combineReducers } from 'redux';
import {
	authReducer,
	quizReducer,
	questionReducer,
	takeQuizReducer,
} from './slices';
const rootReducer = combineReducers({
	auth: authReducer,
	quiz: quizReducer,
	question: questionReducer,
	takeQuiz: takeQuizReducer,
});

export default rootReducer;
