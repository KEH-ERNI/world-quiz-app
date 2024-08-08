import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { Homepage, Quizzes, QuizItem, Result } from '../pages';
const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/quizzes' element={<Quizzes />} />
					<Route path='/quiz/:quizId' element={<QuizItem />} />
					<Route path='/result/:takeId' element={<Result />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default RoutesNav;
