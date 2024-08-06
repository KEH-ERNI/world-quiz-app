import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { Homepage, Quizzes, QuizItem } from '../pages';
const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/quizzes' element={<Quizzes />} />
					<Route path='/quiz/:quizId' element={<QuizItem />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default RoutesNav;
