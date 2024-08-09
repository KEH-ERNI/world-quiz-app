import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CusBtn, CusChoices, CusModal } from '../components';
import { useDispatch } from 'react-redux';
import { addTakeQuiz } from '../redux/slices';
import { useNavigate } from 'react-router-dom';
import { getTakeQuizzes } from '../redux/slices/takeQuizSlice';
const StudentItem = ({ current, user }) => {
	const [curIndex, setCurIndex] = useState(0);
	const [openSubmit, setOpenSubmit] = useState(false);
	const navigate = useNavigate();
	const [answers, setAnswers] = useState({});
	const dispatch = useDispatch();


	const { control, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			quizID: current?.quizID,
			userID: user.userID,
			score: 0,
		},
	});
	let questions = current?.questions || [];

	const handleNext = () => {
		const curAnswer = watch(`question${curIndex}`);
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[`question${curIndex}`]: curAnswer,
		}));

		if (curIndex < questions.length - 1) {
			setCurIndex(curIndex + 1);
		}
	};

	const handlePrev = () => {
		const curAnswer = watch(`question${curIndex}`);
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[`question${curIndex}`]: curAnswer,
		}));

		if (curIndex > 0) {
			setCurIndex(curIndex - 1);
		}
	};

	const curQuestion = questions[curIndex];

	const onSubmit = (data) => {
		const score = Object.keys(data).reduce((acc, key) => {
			const questionIndex = key.replace('question', '');
			const selectedText = data[key];
			const question = questions[questionIndex];
			const selOption = question?.options.find(
				(option) => option.text === selectedText
			);
			if (selOption?.isCorrect) {
				acc += 1;
			}
			return acc;
		}, 0);

		const dataFormat = {
			quizID: current?.quizID,
			score: score,
			userID: data.userID,
		};

		dispatch(addTakeQuiz(dataFormat)).then((response) => {
			dispatch(getTakeQuizzes());
			let takeId = response?.payload?.takeID;
			navigate(`/result/${takeId}`);
		});
	};

	React.useEffect(() => {
		if (answers[`question${curIndex}`]) {
			setValue(`question${curIndex}`, answers[`question${curIndex}`]);
		}
	}, [curIndex, setValue, answers]);

	return (
		<div>
			<div className='flex flex-col gap-2 md:full md:items-center md:justify-center'>
				{curQuestion && (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-2 md:w-1/2 '
					>
						<div className='bg-white p-4 shadow-custom rounded-lg text-sm font-light flex flex-col gap-2'>
							<div className='text-sm font-medium md:py-6 '>
								<h2>
									{curIndex + 1}.) {curQuestion.text}
								</h2>
							</div>
							<hr className='border-shadow' />
							<div className='flex flex-col md:gap:4'>
								<CusChoices
									options={curQuestion.options}
									control={control}
									name={`question${curIndex}`}
								/>
							</div>
						</div>

						<div className='flex flex-row justify-between gap-8'>
							{curIndex == 0 ? (
								<div></div>
							) : (
								<CusBtn
									content={'Previous'}
									style={'secondary'}
									action={handlePrev}
									w={'1/2'}
								/>
							)}

							{curIndex == questions.length - 1 ? (
								<CusBtn
									content={'Submit'}
									style={'primary'}
									w={'1/2'}
									action={() => setOpenSubmit(true)}
								/>
							) : (
								<CusBtn
									content={'Next'}
									style={'primary'}
									action={handleNext}
									w={'1/2'}
								/>
							)}
						</div>
						<CusModal
							openModal={openSubmit}
							setOpenModal={setOpenSubmit}
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
									Are you sure with your answers?
									<div className='mt-2 flex flex-row gap-2 w-full justify-between'>
										<CusBtn
											content={'NOT YET'}
											style={'secondary'}
											w={'full'}
											action={() => {
												setOpenSubmit(false);
											}}
										/>
										<CusBtn
											content={'YES!'}
											style={'primary'}
											type={'submit'}
											w={'full'}
										/>
									</div>
								</div>
							}
						/>
					</form>
				)}
			</div>
		</div>
	);
};

export default StudentItem;
