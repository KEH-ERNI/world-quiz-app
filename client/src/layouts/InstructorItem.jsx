import { CusBtn, CusModal } from '../components';
import { useState } from 'react';
import { ItemForm } from '../forms';
import { useDispatch } from 'react-redux';
import { delQuestion, getQuiz } from '../redux/slices';
const InstructorItem = ({ current }) => {
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [currentItem, setCurrentItem] = useState();
	const dispatch = useDispatch();

	const onDeleteItem = (id) => {
		dispatch(delQuestion(id)).then(() => {
			dispatch(getQuiz(current?.quizID));
		});
	};

	if (current) {
		let questions = current?.questions;

		console.log(questions.length < current.quantity);
		return (
			<div className='flex flex-col gap-3'>
				{questions.length < current?.quantity && (
					<div>
						<CusBtn
							style={'primary'}
							content={'+ ADD ITEM'}
							action={() => setOpenAdd(true)}
							w={'full'}
						/>
					</div>
				)}

				<div className='flex flex-col gap-2'>
					{questions.map((question, index) => {
						let options = question.options;
						return (
							<div
								className='bg-white p-4 shadow-custom rounded-lg text-sm font-light flex flex-col gap-2'
								key={index}
							>
								<div className='text-sm font-medium'>
									{index + 1}. {} {question.text}
								</div>

								<hr className='border-shadow' />
								{options.map((option, index) => {
									console.log(option);

									return (
										<div
											key={index}
											className={`${
												option?.isCorrect
													? 'bg-green-light-1 text-green-900'
													: 'bg-red-light-1 text-red-900'
											} p-2 flex flex-row gap-2 `}
										>
											{option?.isCorrect ? (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
													className='size-6'
												>
													<path
														fillRule='evenodd'
														d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
														clipRule='evenodd'
													/>
												</svg>
											) : (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
													className='size-6'
												>
													<path
														fillRule='evenodd'
														d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
														clipRule='evenodd'
													/>
												</svg>
											)}

											{option.text}
										</div>
									);
								})}
								<div className='flex flex-row w-full items-center align-center justify-center gap-2'>
									<button
										onClick={() => {
											setOpenEdit(true);
											setCurrentItem(question);
										}}
										className='bg-blue-light p-2 w-full'
									>
										<div className='flex w-full items-center text-center justify-center gap-1'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='size-4'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
												/>
											</svg>
											<div className=''>Edit</div>
										</div>
									</button>

									<button
										onClick={() => {
											onDeleteItem(question.questionID);
										}}
										className='bg-red-light flex w-full'
									>
										<div className='flex w-full items-center text-center justify-center gap-1'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='size-4'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
												/>
											</svg>
											<div>Delete</div>
										</div>
									</button>
								</div>
							</div>
						);
					})}
				</div>

				<CusModal
					content={
						<ItemForm
							setOpenModal={setOpenAdd}
							quizID={current?.quizID}
						/>
					}
					openModal={openAdd}
					setOpenModal={setOpenAdd}
				/>
				<CusModal
					content={
						<ItemForm
							setOpenModal={setOpenEdit}
							quizID={current?.quizID}
							existData={currentItem}
						/>
					}
					openModal={openEdit}
					setOpenModal={setOpenEdit}
				/>
			</div>
		);
	}
};

export default InstructorItem;
