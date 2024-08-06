import { CusBtn, CusCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes } from '../redux/slices';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const StudentQuiz = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
	const { loading, data, error } = useSelector((state) => state.quiz);

	useEffect(() => {
		dispatch(getQuizzes());
	}, [dispatch]);

	// localStorage.removeItem('state');
	// localStorage.removeItem('ACCESS_TOKEN');
	// localStorage.removeItem('ACCESS_USER');

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	return (
		<main
			className={`container-fluid w-screen min-h-screen p-8 bg-bg-light text-txt-light`}
		>
			<section className='mt-4 font-lexend flex flex-col gap-8'>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-2'>
						<div className='text-3xl font-medium text-primary'>
							Quizzes
						</div>
						<div className='font-light text-sm'>
							Start taking quizzes today and make a lasting impact
							on your educational journey!
						</div>
					</div>
					<div className='bg-shadow p-3 flex rounded-xl shadow-custom flex-col font-light text-sm gap-2'>
						<div className='bg-light p-3'>search bar</div>
						<div className='bg-light p-3'>category</div>
						<div className='bg-light p-3'>difficulty</div>
						<div className='bg-light p-3'>enter code here</div>
						<CusBtn
							content={'JOIN'}
							style={'primary'}
							action={() => setOpenAdd(true)}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-12'>
					{categories.map((category) => {
						const filteredQuiz = Array.isArray(data)
							? data.filter((quiz) => quiz.category === category)
							: [];

						if (filteredQuiz.length == 0) {
							return null;
						}

						return (
							<div key={category} className='flex flex-col gap-4'>
								<div className='gap-1'>
									<div>{category}</div>
									<div className='text-sm'>Description</div>
								</div>

								{filteredQuiz.map((quiz) => (
									<div key={quiz.quizID}>
										<CusCard
											title={quiz.name}
											quantity={quiz.quantity}
											description={quiz.description}
											type={quiz.type}
											difficulty={quiz.difficulty}
											code={quiz.code}
											filename={quiz.imageName}
											actions={
												<CusBtn
													style={'primary'}
													content={'TAKE QUIZ'}
													action={() =>
														navigate(
															`/quiz/${quiz.quizID}`
														)
													}
												/>
											}
										/>
									</div>
								))}
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default StudentQuiz;
