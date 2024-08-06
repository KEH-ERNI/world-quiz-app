import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getQuiz } from '../../redux/slices';
import { InstructorItem, StudentItem } from '../../layouts';
const QuizItem = () => {
	const dispatch = useDispatch();
	const { quizId } = useParams();

	const { user } = useSelector((state) => state.auth);
	const { loading, current, error } = useSelector((state) => state.quiz);

	useEffect(() => {
		if (quizId) {
			dispatch(getQuiz(quizId));
		}
	}, [quizId, dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{user?.type === 'Instructor' && (
				<InstructorItem current={current} quizId={quizId} />
			)}
			{user?.type === 'Student' && (
				<StudentItem current={current} quizId={quizId} user={user} />
			)}
		</div>
	);
};

export default QuizItem;
