import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CusChoices } from '../components';
import { useDispatch } from 'react-redux';
import { addTakeQuiz, getTakeQuiz } from '../redux/slices';
import { useNavigate } from 'react-router-dom';
import { getTakeQuizzes } from '../redux/slices/takeQuizSlice';
const StudentItem = ({ current, user }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const navigate = useNavigate();
	const [answers, setAnswers] = useState({});
	const dispatch = useDispatch();

	const { control, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			quizID: current.quizID,
			userID: user.userID,
			score: 0,
		},
	});
	let questions = current?.questions || [];

	const handleNext = () => {
		const currentAnswer = watch(`question${currentQuestionIndex}`);
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[`question${currentQuestionIndex}`]: currentAnswer,
		}));

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePrev = () => {
		const currentAnswer = watch(`question${currentQuestionIndex}`);
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[`question${currentQuestionIndex}`]: currentAnswer,
		}));

		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const currentQuestion = questions[currentQuestionIndex];

	const onSubmit = (data) => {
		const score = Object.keys(data).reduce((acc, key) => {
			const questionIndex = key.replace('question', '');
			const selectedText = data[key];
			const question = questions[questionIndex];
			const selectedOption = question?.options.find(
				(option) => option.text === selectedText
			);
			if (selectedOption?.isCorrect) {
				acc += 1;
			}
			return acc;
		}, 0);

		const dataFormat = {
			quizID: data.quizID,
			score: score,
			userID: data.userID,
		};

		dispatch(addTakeQuiz(dataFormat)).then((response) => {
			console.log(response);

			dispatch(getTakeQuizzes());
			navigate(`/quizzes`);
		});
	};

	React.useEffect(() => {
		if (answers[`question${currentQuestionIndex}`]) {
			setValue(
				`question${currentQuestionIndex}`,
				answers[`question${currentQuestionIndex}`]
			);
		}
	}, [currentQuestionIndex, setValue, answers]);

	return (
		<div className='container-fluid w-screen min-h-screen p-8 bg-bg-light text-txt-light font-lexend flex flex-col gap-4'>
			<h1>{current?.name}</h1>

			{currentQuestion && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<div className='question'>
							<h2>{currentQuestion.text}</h2>
						</div>
						<div className='options'>
							<CusChoices
								options={currentQuestion.options}
								control={control}
								name={`question${currentQuestionIndex}`}
							/>
						</div>
					</div>

					<div className='navigation'>
						<button
							type='button'
							onClick={handlePrev}
							disabled={currentQuestionIndex === 0}
						>
							Prev
						</button>
						<button
							type='button'
							onClick={handleNext}
							disabled={
								currentQuestionIndex === questions.length - 1
							}
						>
							Next
						</button>
						<button type='submit'>Submit</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default StudentItem;
