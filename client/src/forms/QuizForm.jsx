import { CusInput, CusTextArea, CusBtn, CusSelect } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addQuiz, getQuizzes } from '../redux/slices';

const QuizForm = ({ setOpenModal }) => {
	const dispatch = useDispatch();
	const [quizDescription, setQuizDescription] = useState(null);
	const [showQuestion, setShowQuestion] = useState(false);
	const [file, setFile] = useState(null);
	const { user } = useSelector((state) => state.auth);

	const generateCode = () => {
		return Math.floor(100000 + Math.random() * 900000);
	};

	// localStorage.removeItem('state');
	// localStorage.removeItem('ACCESS_TOKEN');
	// localStorage.removeItem('ACCESS_USER');

	const { control, handleSubmit } = useForm({
		defaultValues: {
			userID: user.userID,
			name: '',
			category: '',
			type: '',
			difficulty: '',
			quantity: 10,
			description: '',
			imageFile: '',
			code: generateCode(),
		},
	});

	const { control: questionControl, handleSubmit: handleQuestionSubmit } =
		useForm();

	const onFileChange = (file) => {
		setFile(file);
	};

	const onProceed = (data) => {
		setQuizDescription(data);
		setShowQuestion(true);
	};

	const onSubmit = async (data) => {
		const questions = Object.values(data).map((text) => ({
			text,
		}));

		const formData = new FormData();
		formData.append('userID', quizDescription.userID);
		formData.append('name', quizDescription.name);
		formData.append('category', quizDescription.category);
		formData.append('type', quizDescription.type);
		formData.append('difficulty', quizDescription.difficulty);
		formData.append('quantity', quizDescription.quantity);
		formData.append('description', quizDescription4.description);
		formData.append('code', quizDescription.code);
		formData.append('imageFile', file);
		questions.forEach((question, index) => {
			formData.append(`questions[${index}][text]`, question.text);
		});

		// choices.forEach((question, index) => {
		// 	formData.append(`questions[${index}][text][${index}]`, question.text);
		// });
		dispatch(addQuiz(formData)).then(() => {
			dispatch(getQuizzes());
			setOpenModal(false);
		});
	};

	const category = [
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
	const type = ['Multiple Choice', 'Identification', 'True or False'];
	const difficulty = ['Easy', 'Medium', 'Hard'];

	return (
		<div className='text-left pt-0 px-2 pb-2 font-lexend'>
			<div className='flex flex-col gap-1'>
				<div className='text-xl font-medium'>Add Quiz</div>
				<div className='border-t border-primary-35 mt-2' />
				<div className='flex flex-col'></div>
			</div>

			{!showQuestion ? (
				<form
					className='mt-6 flex flex-col gap-2'
					onSubmit={handleSubmit(onProceed)}
				>
					<CusInput
						placeholder={'Name'}
						control={control}
						name={'name'}
					/>
					<CusSelect
						name='category'
						placeholder='Category'
						control={control}
						options={category}
					/>
					<CusSelect
						name='type'
						placeholder='Type'
						control={control}
						options={type}
					/>
					<CusSelect
						name='difficulty'
						placeholder='Difficulty'
						control={control}
						options={difficulty}
					/>
					<CusInput
						placeholder={'Quantity'}
						control={control}
						name={'quantity'}
						type={'number'}
					/>
					<CusTextArea
						name={'description'}
						placeholder={'Description'}
						control={control}
					/>
					<CusInput
						placeholder={'Cover Image'}
						control={control}
						name={'imageFile'}
						type='file'
						onFileChange={onFileChange}
					/>
					<div className='flex flex-row gap-2'>
						<CusBtn content={'CANCEL'} style={'secondary'} />
						<CusBtn
							content={'PROCEED'}
							style={'primary'}
							type='submit'
						/>
					</div>
				</form>
			) : (
				<form onSubmit={handleQuestionSubmit(onSubmit)}>
					{Array.from({ length: quizDescription.quantity }).map(
						(_, index) => (
							<div className='flex flex-col gap-2 mt-4'>
								<div
									className={`${
										index == 0 && 'hidden'
									} border-t border-primary-35`}
								/>
								<div>Question {index + 1}</div>
								<CusTextArea
									name={`texts-${[index + 1]}`}
									placeholder={`Question`}
									control={questionControl}
								/>
								<CusInput
									placeholder={'Option 1'}
									control={control}
									name={'name'}
								/>
								<CusInput
									placeholder={'Option 2'}
									control={control}
									name={'name'}
								/>
								<CusInput
									placeholder={'Option 3'}
									control={control}
									name={'name'}
								/>
								<CusInput
									placeholder={'Option 4'}
									control={control}
									name={'name'}
								/>
							</div>
						)
					)}
					<div className='mt-4 flex flex-row gap-2 justify-between'>
						<CusBtn
							content={'BACK'}
							style={'secondary'}
							w={'full'}
							action={() => setShowQuestion(false)}
						/>
						<CusBtn
							content={'SUBMIT'}
							style={'primary'}
							type='submit'
							w={'full'}
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default QuizForm;
