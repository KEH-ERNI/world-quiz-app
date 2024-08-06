import { CusInput, CusTextArea, CusBtn, CusSelect } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addQuiz, editQuiz, getQuizzes } from '../redux/slices';
import { useNavigate } from 'react-router-dom';

const QuizForm = ({ setOpenModal, existData = null }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [file, setFile] = useState(null);
	const { user } = useSelector((state) => state.auth);

	const generateCode = () => {
		return Math.floor(100000 + Math.random() * 900000);
	};

	// localStorage.removeItem('state');
	// localStorage.removeItem('ACCESS_TOKEN');
	// localStorage.removeItem('ACCESS_USER');

	const { control, handleSubmit, setValue } = useForm({
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

	useEffect(() => {
		if (existData) {
			setValue('name', existData.name);
			setValue('category', existData.category);
			setValue('type', existData.type);
			setValue('difficulty', existData.difficulty);
			setValue('quantity', existData.quantity);
			setValue('description', existData.description);
			setValue('code', existData.code);
			setFile(existData.imageFile);
		}
	}, [existData, setValue]);

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

		if (existData) {
			dispatch(editQuiz({ id: existData.quizID, formData })).then(
				(response) => {
					console.log(response);
					dispatch(getQuizzes());
					setOpenModal(false);
				}
			);
		} else {
			dispatch(addQuiz(formData)).then((response) => {
				console.log(response);
				dispatch(getQuizzes());
				setOpenModal(false);
				// navigate(`/quiz/${response.payload.id}`);
			});
		}
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
				<div className='text-xl font-medium'>
					{existData ? 'Edit' : 'Add'} Quiz
				</div>
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
				<div className='flex flex-row gap-2 w-full justify-between'>
					<CusBtn content={'CANCEL'} style={'secondary'} w={'full'} />
					<CusBtn
						content={`${existData ? 'EDIT' : 'ADD'}`}
						style={'primary'}
						type='submit'
						w={'full'}
					/>
				</div>
			</form>
		</div>
	);
};

export default QuizForm;
