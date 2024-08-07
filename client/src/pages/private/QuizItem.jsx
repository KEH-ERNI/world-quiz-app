import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getQuiz } from '../../redux/slices';
import { InstructorItem, StudentItem } from '../../layouts';
const QuizItem = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { quizId } = useParams();

	const { user } = useSelector((state) => state.auth);
	const { loading, current, error } = useSelector((state) => state.quiz);

	const categoriesIcon = [
		{
			name: 'Geography',
			icon: 'geography.png',
		},
		{
			name: 'History',
			icon: 'history.png',
		},
		{
			name: 'Culture',
			icon: 'culture.png',
		},
		{
			name: 'Science and Nature',
			icon: 'science.png',
		},
		{
			name: 'Sports',
			icon: 'sports.png',
		},
		{
			name: 'Music and Entertainment',
			icon: 'music.png',
		},
		{
			name: 'Economics and Politics',
			icon: 'economic.png',
		},
		{
			name: 'Technology and Innovation',
			icon: 'technology.png',
		},
		{
			name: 'Current Affairs',
			icon: 'current.png',
		},
	];

	const catMatched = categoriesIcon.find(
		(cat) => cat.name === current?.category
	);

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
		<div className='container-fluid w-screen min-h-screen p-8 bg-bg-light text-txt-light font-lexend flex flex-col gap-4'>
			<button
				className='bg-transparent px-0 pt-0 focus:outline-none'
				onClick={() => navigate(-1)}
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
			<div className='flex flex-row gap-2'>
				<div className='rounded-lg bg-white shadow-custom flex items-center justify-center p-2'>
					<img
						src={`https://localhost:7045/images/${current?.imageName}`}
						className='w-full h-auto object-contain'
					/>
				</div>
				<div className='flex flex-col gap-1 text-sm font-light'>
					<div className='flex flex-col justify-between items-left'>
						<div className='text-xl font-semibold bg-shadow p-1'>
							{current?.name}
						</div>
						<div>{current?.quantity} items</div>
					</div>

					<div className='flex flex-col justify-between items-left'>
						<div className='flex flex-row gap-1'>
							<div>
								<img
									src={`../images/current.png`}
									className='w-5 h-5'
								/>
							</div>
							{current?.category}
						</div>
						<div className='flex flex-row gap-1 justify-start items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='size-4'
							>
								<path
									fillRule='evenodd'
									d='M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z'
									clipRule='evenodd'
								/>
							</svg>

							{current?.type}
						</div>
						<div className='flex flex-row gap-1 items-center text-red'>
							<svg
								className='w-3 h-3 '
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z' />
							</svg>
							{current?.difficulty}
						</div>
					</div>
				</div>
			</div>
			<div className='text-sm font-light bg-shadow rounded-sm p-2'>
				{current?.description}
			</div>
			{user?.type === 'Instructor' && (
				<InstructorItem current={current} />
			)}
			{user?.type === 'Student' && (
				<StudentItem current={current} user={user} />
			)}
		</div>
	);
};

export default QuizItem;
