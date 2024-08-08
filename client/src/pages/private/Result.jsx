import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getQuiz, getTakeQuiz } from '../../redux/slices';
import { CusBtn } from '../../components';
import moment from 'moment';

const Result = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { takeId } = useParams();

	const { current } = useSelector((state) => state.takeQuiz);
	const { data } = useSelector((state) => state.quiz);

	useEffect(() => {
		if (takeId) {
			dispatch(getTakeQuiz(takeId));
			dispatch(getQuiz(current?.quizID));
		}
	}, [takeId, dispatch]);

	const isPassed = current?.score > data[0]?.quantity / 2;

	return (
		<div className='container-fluid w-screen min-h-screen p-8 bg-bg-light text-txt-light font-lexend flex flex-col gap-4'>
			<button
				className='bg-transparent px-0 pt-0 focus:outline-none'
				onClick={() => navigate('/quizzes')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='size-4'
				>
					<path
						fillRule='evenodd'
						d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
			<div className='flex justify-center items-center flex-col flex-grow gap-3 mb-5'>
				<img
					src={isPassed ? '../gif/applause.gif' : '../gif/failed.gif'}
					className={isPassed ? 'w-48' : 'w-40'}
				/>
				<div className='text-5xl font-bold '>
					{current?.score}/{data[0]?.quantity}
				</div>
				<div
					className={`text-xl font-semibold ${
						isPassed ? 'text-primary' : 'text-primdark'
					}`}
				>
					{isPassed ? 'Congratulations!' : 'Better luck next time!'}
				</div>
				<div className='text-sm text-center'>
					You {isPassed ? 'passed' : 'failed'} the{' '}
					<span className='text-primary'>"{data[0]?.name}"</span> on{' '}
					{moment(current?.date).format('MMMM Do YYYY, h:mm:ss a')}.
				</div>
			</div>
			{isPassed ? (
				<CusBtn
					content={'Browse Other Quizzes'}
					style={'primary'}
					action={() => navigate('/quizzes')}
				/>
			) : (
				<CusBtn
					content={
						<div className='flex-row flex justify-center items-center'>
							Retry
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='ml-3 size-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
								/>
							</svg>
						</div>
					}
					style={'primary'}
					action={() => navigate(`/quiz/${data[0]?.quizID}`)}
				/>
			)}
		</div>
	);
};

export default Result;
