import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { loadState, saveState } from '../localStorage';

const preloadedState = loadState();

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
});

store.subscribe(() => {
	saveState(store.getState());
});

export default store;
