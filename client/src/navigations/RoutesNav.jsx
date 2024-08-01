import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Homepage, Quizzes } from '../pages';

const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/quizzes' element={<Quizzes />} />
			</Routes>
		</Router>
	);
};

export default RoutesNav;
