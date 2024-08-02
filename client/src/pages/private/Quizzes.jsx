import React, { useEffect, useState } from 'react';
import { CusBtn, CusModal, CusCard } from '../../components';
import { QuizForm } from '../../forms';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes } from '../../redux/slices';

const Quizzes = () => {
	const [openAdd, setOpenAdd] = useState(false);
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
	const { loading, data, error } = useSelector((state) => state.quiz);

	// localStorage.removeItem('state');
	// localStorage.removeItem('ACCESS_TOKEN');
	// localStorage.removeItem('ACCESS_USER');

	useEffect(() => {
		dispatch(getQuizzes());
	}, [dispatch]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	console.log(data);
	return (
		<main
			className={`container-fluid min-w-screen min-h-screen p-8 bg-bg-light text-txt-light`}
		>
			<section className='mt-4 font-lexend flex flex-col gap-8'>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-2'>
						<div className='text-3xl font-medium text-primary'>
							Quizzes
						</div>
						<div className='font-light text-sm'>
							Start creating your quizzes today and make a lasting
							impact on your students' educational journey!
						</div>
					</div>
					<div className='bg-shadow p-3 flex rounded-xl shadow-custom flex-col font-light text-sm gap-2'>
						<div className='bg-light p-3'>search bar</div>
						<div className='bg-light p-3'>category</div>
						<div className='bg-light p-3'>difficulty</div>
						<CusBtn
							content={'+ ADD QUIZ'}
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
									<CusCard
										key={quiz.id}
										title={quiz.name}
										quantity={quiz.quantity}
										description={quiz.description}
										type={quiz.type}
										difficulty={quiz.difficulty}
										code={quiz.code}
										filename={quiz.imageName}
										actions={
											<div className='flex flex-row justify-between'>
												<CusBtn
													content={
														<>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																strokeWidth={
																	1.5
																}
																stroke='currentColor'
																className='size-6'
															>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
																/>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
																/>
															</svg>
															<div className='hidden'>
																View
															</div>
														</>
													}
													style={'secondary'}
												/>
												<CusBtn
													content={
														<>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																strokeWidth={
																	1.5
																}
																stroke='currentColor'
																className='size-6'
															>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
																/>
															</svg>
															<div className='hidden'>
																Edit
															</div>
														</>
													}
													style={'secondary'}
												/>
												<CusBtn
													content={
														<>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																strokeWidth={
																	1.5
																}
																stroke='currentColor'
																className='size-6'
															>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
																/>
															</svg>
															<div className='hidden'>
																Delete
															</div>
														</>
													}
													style={'secondary'}
												/>
											</div>
										}
									/>
								))}
							</div>
						);
					})}
				</div>
			</section>
			<CusModal
				content={<QuizForm setOpenModal={setOpenAdd} />}
				openModal={openAdd}
				setOpenModal={setOpenAdd}
			/>
		</main>
	);
};

export default Quizzes;
