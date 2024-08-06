import { CusInput, CusTextArea, CusBtn, CusSelect } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addQuestion, getQuiz, editQuestion } from '../redux/slices';

const ItemForm = ({ quizID, setOpenModal, existData = null }) => {
	const [correctOption, setCorrectOption] = useState(null);
	const dispatch = useDispatch();

	const defaultValues = {
		text: existData?.text || '',
		...existData?.options?.reduce((acc, option, index) => {
			acc[`option${index + 1}`] = option.text;
			return acc;
		}, {}),
	};

	const { control, handleSubmit, setValue } = useForm({ defaultValues });

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

		if (existData) {
			dispatch(
				editQuestion({
					questionId: existData.questionID,
					updatedData: dataFormat,
				})
			).then((response) => {
				console.log(response);
				dispatch(getQuiz(quizID));
				setOpenModal(false);
			});
		} else {
			dispatch(addQuestion(dataFormat)).then((response) => {
				console.log(response);
				dispatch(getQuiz(quizID));
				setOpenModal(false);
			});
		}
	};
	return (
		<div className='text-left pt-0 px-2 pb-2 font-lexend'>
			<div className='flex flex-col gap-1'>
				<div className='text-xl font-medium'>Item 1</div>
				<div className='border-t border-primary-35 mt-2' />
				<div className='flex flex-col'></div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col mb-2 mt-4'>
					<CusTextArea
						name={`text`}
						placeholder={`Question`}
						control={control}
					/>
				</div>

				{Array.from({ length: 4 }).map((_, optIndex) => (
					<div
						key={optIndex}
						className='mb-2 flex flex-row w-full justify-between'
					>
						<input
							type='radio'
							name='correctOption'
							value={optIndex}
							checked={correctOption === optIndex}
							onChange={() => setCorrectOption(optIndex)}
							className='mr-2'
						/>
						<CusInput
							placeholder={`Option ${optIndex + 1}`}
							control={control}
							name={`option${optIndex + 1}`}
						/>
					</div>
				))}

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
