import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { loadState, saveState, clearLocalState } from '../localStorage';
const preloadedState = loadState();

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(clearLocalState),
});

store.subscribe(() => {
	saveState(store.getState());
});

export default store;
