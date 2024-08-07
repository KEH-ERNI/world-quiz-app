import { combineReducers } from 'redux';
import {
	authReducer,
	quizReducer,
	questionReducer,
	takeQuizReducer,
} from './slices';

const appReducer = combineReducers({
	auth: authReducer,
	quiz: quizReducer,
	question: questionReducer,
	takeQuiz: takeQuizReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
