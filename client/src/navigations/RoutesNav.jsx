import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { useSelector } from 'react-redux';
import { Homepage, Quizzes, QuizItem } from '../pages';
import { InstructorQuiz, StudentQuiz } from '../layouts';
const RoutesNav = () => {
	const { user } = useSelector((state) => state.auth);
	console.log(user && user.type === 'Instructor'); // returns true
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				{/* <Route path='/quizzes' element={<InstructorQuiz />} /> */}
				<Route element={<PrivateRoutes />}>
					{/* <Route path='/quizzes' element={<Quizzes />} /> */}
					<Route path='/quizzes' element={<InstructorQuiz />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default RoutesNav;
