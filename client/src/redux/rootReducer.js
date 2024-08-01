import { combineReducers } from 'redux';
import { authReducer, quizReducer } from './slices';
const rootReducer = combineReducers({
	auth: authReducer,
	quiz: quizReducer,
});

export default rootReducer;
