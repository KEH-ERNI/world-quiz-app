import { CusBtn, CusCard, CusModal } from '../components';
import { getQuizzes } from '../redux/slices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Setting from './Setting';

const StudentQuiz = ({ categories, dispatch, data }) => {
	const navigate = useNavigate();
	const [currentQuiz, setCurrentQuiz] = useState();
	const [openQuiz, setOpenQuiz] = useState(false);
	const [code, setCode] = useState();

	const [search, setSearch] = useState('');
	const [categ, setCategory] = useState('');
	const [difficulty, setDifficulty] = useState('');

	useEffect(() => {
		dispatch(getQuizzes());
	}, [dispatch]);

	return (
		<>
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
						<Setting
							categories={categories}
							search={search}
							setSearch={setSearch}
							difficulty={difficulty}
							setDifficulty={setDifficulty}
							category={categ}
							setCategory={setCategory}
						/>
						<div className='px-3 py-2 text-sm font-light bg-inputbg w-full rounded-lg ring-1 ring-inset ring-primary-20  shadow-lg flex flex-row items-center shadow-lg'>
							<input
								type='number'
								className='form-control pl-2 text-sm font-light bg-inputbg w-full  placeholder:text-primary-50 focus:outline-none'
								placeholder={`Enter code here.`}
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>
							<CusBtn
								content={'JOIN'}
								style={'primary'}
								p={1}
								font={'xs'}
								action={() => {
									let m = data?.filter((q) => {
										return q.code == code;
									});
									if (code) {
										navigate(`/quiz/${m[0]?.quizID}`);
									}
								}}
							/>
						</div>
					</div>
				</div>
				<div className='grid gap-12 lg:grid-cols-3'>
					{categories.map((category) => {
						const filteredQuiz = Array.isArray(data)
							? data.filter(
									(quiz) => quiz.category === category.name
							  )
							: [];

						console.log(filteredQuiz);
						const setFiltered = filteredQuiz.filter((quiz) => {
							const matchesSearch = search
								? quiz.name
										.toLowerCase()
										.includes(search.toLowerCase())
								: true;
							const matchesCategory = categ
								? quiz.category === categ
								: true;
							const matchesDifficulty = difficulty
								? quiz.difficulty === difficulty
								: true;
							const matchesQuantity =
								quiz.questions.length === quiz.quantity;
							return (
								matchesSearch &&
								matchesCategory &&
								matchesDifficulty &&
								matchesQuantity
							);
						});

						const displayData =
							search || category.name || difficulty
								? setFiltered
								: data;

						if (displayData.length === 0) {
							return null;
						}

						return (
							<div key={category.name} className='col-span-full'>
								<div className='gap-1 mb-2'>
									<div className='flex flex-row gap-2 bg-shadow p-2 rounded-lg uppercase items-center text-md'>
										<img
											src={`./images/${category.icon}`}
											className='w-6 h-6 ml-2'
										/>
										{category.name}
									</div>
								</div>
								<div className='grid gap-4 lg:grid-cols-3'>
									{setFiltered.map((quiz) => (
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
														action={() => {
															setCurrentQuiz(
																quiz
															);
															setOpenQuiz(true);
														}}
													/>
												}
											/>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</section>
			<CusModal
				content={
					<div className='flex flex-col items-center font-lexend gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='size-12 text-primary'
						>
							<path
								fillRule='evenodd'
								d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
								clipRule='evenodd'
							/>
						</svg>
						Are you ready to take this quiz?
						<div className='mt-2 flex flex-row gap-2 w-full justify-between'>
							<CusBtn
								content={'NOT YET'}
								style={'secondary'}
								w={'full'}
								action={() => {
									setOpenQuiz(false);
								}}
							/>
							<CusBtn
								content={'YES!'}
								style={'primary'}
								action={() => {
									navigate(`/quiz/${currentQuiz?.quizID}`);
								}}
								w={'full'}
							/>
						</div>
					</div>
				}
				setOpenModal={setOpenQuiz}
				openModal={openQuiz}
			/>
		</>
	);
};

export default StudentQuiz;
