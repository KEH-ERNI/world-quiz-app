import { CusTextArea, CusBtn } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addQuestion, getQuiz, editQuestion } from '../redux/slices';

const ItemForm = ({
	quizID,
	setOpenModal,
	existData = null,
	setAlertDesc,
	setAlertMsg,
	setAlertVisible,
}) => {
	const [correctOption, setCorrectOption] = useState(null);
	const [correctError, setCorrectError] = useState(null);
	const dispatch = useDispatch();

	const defaultValues = {
		text: existData?.text || '',
		option1: existData?.options?.[0]?.text || '',
		option2: existData?.options?.[1]?.text || '',
		option3: existData?.options?.[2]?.text || '',
		option4: existData?.options?.[3]?.text || '',
	};

	const {
		control,
		handleSubmit,
		setValue,
		register,
		reset,
		formState: { errors },
	} = useForm({ defaultValues });

	useEffect(() => {
		if (existData) {
			setValue('text', existData.text);
			existData.options?.forEach((option, index) => {
				setValue(`option${index + 1}`, option.text);
				if (option.isCorrect) setCorrectOption(index);
			});
		}
	}, [existData, setValue]);

	const onSubmit = async (data) => {
		const { text, questionID, ...optionsArray } = data;

		const options = Object.keys(optionsArray).map((key, index) => ({
			text: optionsArray[key],
			isCorrect: index === correctOption,
		}));

		const dataFormat = {
			quizID: quizID,
			text,
			options,
		};

		if (correctOption === null) {
			setCorrectError('Select at least one correct answer.');
		} else {
			setCorrectError(null);

			if (existData) {
				dispatch(
					editQuestion({
						questionId: existData.questionID,
						updatedData: dataFormat,
					})
				).then((response) => {
					dispatch(getQuiz(quizID));
					setOpenModal(false);
					setAlertMsg('Success!');
					setAlertDesc('This item has been successfully edited.');
					setAlertVisible(true);
					setTimeout(() => setAlertVisible(false), 3000);
				});
			} else {
				dispatch(addQuestion(dataFormat)).then((response) => {
					dispatch(getQuiz(quizID));
					setOpenModal(false);
					reset(defaultValues);
					setCorrectOption(null);
					setAlertMsg('Success!');
					setAlertDesc('The item has been successfully added.');
					setAlertVisible(true);
					setTimeout(() => setAlertVisible(false), 3000);
				});
			}
		}
	};

	return (
		<div className='text-left pt-0 px-2 pb-2 font-lexend'>
			<div className='flex flex-col gap-1'>
				<div className='text-xl font-medium'>Item</div>
				<div className='border-t border-primary-35 mt-2' />
				<div className='flex flex-col'></div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col mb-2 mt-4'>
					<CusTextArea
						name={`text`}
						placeholder={`Question`}
						control={control}
						{...register('text', {
							required: 'Question is required.',
						})}
					/>
					{errors.text && (
						<span className='text-red-700 font-light text-xs ml-1'>
							{errors.text.message}
						</span>
					)}
				</div>

				{Array.from({ length: 4 }).map((_, optIndex) => (
					<div
						key={optIndex}
						className={`mb-2 flex flex-row w-full justify-center items-center align-center px-3 text-sm font-light bg-inputbg rounded-md ring-1 ring-inset ${
							correctOption === optIndex
								? 'ring-primary'
								: 'ring-primary-35'
						} p-2 text-gray-900 focus:outline-none placeholder:text-primary-35 shadow-lg`}
					>
						<input
							type='radio'
							name='correctOption'
							value={optIndex}
							checked={correctOption === optIndex}
							onChange={() => setCorrectOption(optIndex)}
							className='mr-2 accent-primary'
						/>
						<div className='flex-grow'>
							<CusTextArea
								placeholder={`Option ${optIndex + 1}`}
								control={control}
								name={`option${optIndex + 1}`}
								rows={1}
								none={'none'}
								{...register(`option${optIndex + 1}`, {
									required: `Option ${
										optIndex + 1
									} is required.`,
								})}
							/>
							{errors[`option${optIndex + 1}`] && (
								<span className='text-red-700 font-light text-xs ml-1'>
									{errors[`option${optIndex + 1}`].message}
								</span>
							)}
						</div>
					</div>
				))}

				<p className='text-red-700 font-light text-xs ml-1 mb-3'>
					{correctError}
				</p>
				<CusBtn
					content={'SUBMIT'}
					style={'primary'}
					type='submit'
					w={'full'}
				/>
			</form>
		</div>
	);
};

export default ItemForm;
