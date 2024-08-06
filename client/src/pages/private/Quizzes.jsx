import React from 'react';
import { InstructorQuiz, StudentQuiz } from '../../layouts';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
const Quizzes = () => {
	const { user } = useSelector((state) => state.auth);
	const { data } = useSelector((state) => state.quiz);

	const dispatch = useDispatch();
	const categories = [
		'Geography',
		'History',
		'Culture',
		'Science and Nature',
		'Sports',
		'Music and Entertainment',
		'Economics and Politics',
		'Technology and Innovation',
		'Current Affairs',
	];

	// localStorage.removeItem('state');
	// localStorage.removeItem('ACCESS_TOKEN');
	// localStorage.removeItem('ACCESS_USER');

	return (
		<div>
			{user?.type === 'Instructor' && (
				<InstructorQuiz
					user={user}
					categories={categories}
					dispatch={dispatch}
					data={data}
				/>
			)}
			{user?.type === 'Student' && (
				<StudentQuiz
					categories={categories}
					dispatch={dispatch}
					data={data}
				/>
			)}
		</div>
	);
};

export default Quizzes;
