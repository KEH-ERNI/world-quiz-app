import React, { useEffect, useState } from 'react';
import { CusBtn, CusModal, CusCard, CusAlert } from '../components';
import { QuizForm } from '../forms';

import { getQuizzes, delQuiz } from '../redux/slices';
import { useNavigate } from 'react-router-dom';
import Setting from './Setting';
const InstructorQuiz = ({ user, categories, dispatch, data }) => {
	const navigate = useNavigate();

	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDel, setOpenDelete] = useState(false);
	const [currentQuiz, setCurrentQuiz] = useState(false);

	const [search, setSearch] = useState('');
	const [categ, setCategory] = useState('');
	const [difficulty, setDifficulty] = useState('');

	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const [alertDesc, setAlertDesc] = useState('');

	useEffect(() => {
		dispatch(getQuizzes());
	}, [dispatch]);

	if (data) {
		return (
			<>
				<section className='font-lexend flex flex-col gap-8'>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-2'>
							<div className='text-3xl font-medium text-primary'>
								Quizzes
							</div>
							<div className='font-light text-sm'>
								Start creating your quizzes today and make a
								lasting impact on your students' educational
								journey!
							</div>
						</div>
						<div className='bg-light p-3 flex lg:flex-row rounded-xl shadow-custom flex-col font-light text-sm gap-2'>
							<Setting
								categories={categories}
								search={search}
								setSearch={setSearch}
								difficulty={difficulty}
								setDifficulty={setDifficulty}
								category={categ}
								setCategory={setCategory}
							/>
							<CusBtn
								content={'+ ADD QUIZ'}
								style={'primary'}
								action={() => setOpenAdd(true)}
								lgW={'48'}
							/>
						</div>
					</div>
					{/* <div className='flex flex-col gap-12'>
						{categories.map((category) => {
							const filteredQuiz = Array.isArray(data)
								? data.filter(
										(quiz) =>
											quiz.category === category.name &&
											quiz.userID === user.userID
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
													<div className='flex flex-row justify-between gap-2 items-center'>
														<button
															onClick={() =>
																navigate(
																	`/quiz/${quiz.quizID}`
																)
															}
															className='flex bg-brown-light w-full p-2 '
														>
															<div className='flex w-full items-center text-center gap-1 justify-center'>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	fill='none'
																	viewBox='0 0 24 24'
																	strokeWidth={
																		1.5
																	}
																	stroke='currentColor'
																	className='size-4 text-center'
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
																<div className='font-medium '>
																	View
																</div>
															</div>
														</button>
														<button
															onClick={() => {
																setCurrentQuiz(
																	quiz
																);
																setOpenEdit(
																	true
																);
															}}
															className='bg-blue-light p-2 w-full'
														>
															<div className='flex w-full items-center text-center gap-1 justify-center'>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	fill='none'
																	viewBox='0 0 24 24'
																	strokeWidth={
																		1.5
																	}
																	stroke='currentColor'
																	className='size-4'
																>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
																	/>
																</svg>
																<div>Edit</div>
															</div>
														</button>

														<button
															onClick={() => {
																setOpenDelete(
																	true
																);
																setCurrentQuiz(
																	quiz
																);
															}}
															className='bg-red-light  w-full'
														>
															<div className='flex w-full items-center text-center gap-1 justify-center'>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	fill='none'
																	viewBox='0 0 24 24'
																	strokeWidth={
																		1.5
																	}
																	stroke='currentColor'
																	className='size-4'
																>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
																	/>
																</svg>
																<div>Del</div>
															</div>
														</button>
													</div>
												}
											/>
										</div>
									))}
								</div>
							);
						})}
					</div> */}
					<div className='grid gap-12 lg:grid-cols-3'>
						{categories.map((category) => {
							const filteredQuiz = Array.isArray(data)
								? data.filter(
										(quiz) =>
											quiz.category === category.name &&
											quiz.userID === user.userID
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
									className='col-span-full'
								>
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
													description={
														quiz.description
													}
													type={quiz.type}
													difficulty={quiz.difficulty}
													code={quiz.code}
													filename={quiz.imageName}
													actions={
														<div className='flex flex-row justify-between gap-2 items-center'>
															<button
																onClick={() =>
																	navigate(
																		`/quiz/${quiz.quizID}`
																	)
																}
																className='flex bg-brown-light w-full p-2 '
															>
																<div className='flex w-full items-center text-center gap-1 justify-center'>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		fill='none'
																		viewBox='0 0 24 24'
																		strokeWidth={
																			1.5
																		}
																		stroke='currentColor'
																		className='size-4 text-center'
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
																	<div className='font-medium '>
																		View
																	</div>
																</div>
															</button>
															<button
																onClick={() => {
																	setCurrentQuiz(
																		quiz
																	);
																	setOpenEdit(
																		true
																	);
																}}
																className='bg-blue-light p-2 w-full'
															>
																<div className='flex w-full items-center text-center gap-1 justify-center'>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		fill='none'
																		viewBox='0 0 24 24'
																		strokeWidth={
																			1.5
																		}
																		stroke='currentColor'
																		className='size-4'
																	>
																		<path
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
																		/>
																	</svg>
																	<div>
																		Edit
																	</div>
																</div>
															</button>

															<button
																onClick={() => {
																	setOpenDelete(
																		true
																	);
																	setCurrentQuiz(
																		quiz
																	);
																}}
																className='bg-red-light  w-full'
															>
																<div className='flex w-full items-center text-center gap-1 justify-center'>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		fill='none'
																		viewBox='0 0 24 24'
																		strokeWidth={
																			1.5
																		}
																		stroke='currentColor'
																		className='size-4'
																	>
																		<path
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
																		/>
																	</svg>
																	<div>
																		Del
																	</div>
																</div>
															</button>
														</div>
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
						<QuizForm
							setOpenModal={setOpenAdd}
							setAlertVisible={setAlertVisible}
							setAlertMsg={setAlertMsg}
							setAlertDesc={setAlertDesc}
						/>
					}
					openModal={openAdd}
					setOpenModal={setOpenAdd}
				/>
				<CusModal
					content={
						<QuizForm
							setOpenModal={setOpenEdit}
							existData={currentQuiz}
							setAlertVisible={setAlertVisible}
							setAlertMsg={setAlertMsg}
							setAlertDesc={setAlertDesc}
						/>
					}
					openModal={openEdit}
					setOpenModal={setOpenEdit}
				/>
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
									d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
									clipRule='evenodd'
								/>
							</svg>
							Are you sure you want to delete this quiz?
							<div className='mt-2 flex flex-row gap-2 w-full justify-between'>
								<CusBtn
									content={'CANCEL'}
									style={'secondary'}
									w={'full'}
									action={() => setOpenDelete(false)}
								/>
								<CusBtn
									content={'DELETE'}
									style={'primary'}
									action={() => {
										let id = currentQuiz.quizID;

										dispatch(delQuiz(id)).then(() => {
											dispatch(getQuizzes());
											setOpenDelete(false);

											setAlertMsg('Success!');
											setAlertDesc(
												'The quiz has been successfully deleted.'
											);
											setAlertVisible(true);
											setTimeout(
												() => setAlertVisible(false),
												3000
											);
										});
									}}
									w={'full'}
								/>
							</div>
						</div>
					}
					openModal={openDel}
					setOpenModal={setOpenDelete}
				/>
				{alertVisible && (
					<CusAlert
						type='success'
						message={alertMsg}
						description={alertDesc}
						setAlertVisible={setAlertVisible}
					/>
				)}
			</>
		);
	}
};

export default InstructorQuiz;
