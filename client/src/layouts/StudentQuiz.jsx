import { CusBtn, CusCard } from '../components';
import { getQuizzes } from '../redux/slices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Setting from './Setting';

const StudentQuiz = ({ categories, dispatch, data }) => {
	const navigate = useNavigate();

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
								type='text'
								className='form-control pl-2 text-sm font-light bg-inputbg w-full  placeholder:text-primary-50 focus:outline-none'
								placeholder={`Enter code here.`}
							/>
							<CusBtn content={'JOIN'} style={'primary'} h={4} />
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-12'>
					{categories.map((category) => {
						const filteredQuiz = Array.isArray(data)
							? data.filter(
									(quiz) => quiz.category === category.name
							  )
							: [];

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
							return (
								matchesSearch &&
								matchesCategory &&
								matchesDifficulty
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
							<div
								key={category.name}
								className='flex flex-col gap-4'
							>
								<div className='gap-1'>
									<div className='flex flex-row gap-2 bg-shadow p-2 rounded-lg uppercase items-center text-md'>
										<img
											src={`./images/${category.icon}`}
											className='w-6 h-6 ml-2'
										/>
										{category.name}
									</div>
								</div>

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
		</>
	);
};

export default StudentQuiz;
