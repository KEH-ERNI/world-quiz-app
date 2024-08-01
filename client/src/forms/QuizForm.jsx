import { CusInput, CusTextArea, CusBtn, CusSelect } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addQuiz } from '../redux/slices';

const QuizForm = () => {
	const dispatch = useDispatch();
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
			quantity: '',
			description: '',
			imageFile: '',
			code: generateCode(),
		},
	});

	const onFileChange = (file) => {
		setFile(file);
	};

	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append('userID', data.userID);
		formData.append('name', data.name);
		formData.append('category', data.category);
		formData.append('type', data.type);
		formData.append('difficulty', data.difficulty);
		formData.append('quantity', data.quantity);
		formData.append('description', data.description);
		formData.append('code', data.code);
		formData.append('imageFile', file);

		dispatch(addQuiz(formData));
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
			<form
				className='mt-6 flex flex-col gap-2'
				onSubmit={handleSubmit(onSubmit)}
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
		</div>
	);
};

export default QuizForm;
