import { CusInput, CusBtn, CusRadioBtn } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, token, loading, error } = useSelector((state) => state.auth);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			fName: '',
			lName: '',
			email: '',
			uName: '',
			pass: '',
			type: '',
		},
	});
	const options = [
		{
			value: 'Student',
			imageUrl: 'student.png',
			altText: 'Student',
		},
		{
			value: 'teacher',
			imageUrl: 'teacher.png',
			altText: 'Teacher',
		},
	];

	const onSubmit = async (data) => {
		dispatch(register(data));
	};

	useEffect(() => {
		if (user) {
			localStorage.setItem('ACCESS_TOKEN', token);
			localStorage.setItem('ACCESS_USER', user);

			navigate('/quizzes');
		}
	}, [user, token, navigate]);

	return (
		<div className='text-left pt-0 px-2 pb-2 font-lexend'>
			<div className='flex flex-col gap-1'>
				<div className='text-xl font-medium'>Sign in</div>
				<div className='font-light text-sm'>
					Already have an account?{' '}
					<a className='text-primary'>Log in</a>
				</div>
			</div>

			<form
				className='mt-6 flex flex-col gap-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<CusInput
					placeholder={'First Name'}
					control={control}
					name={'fName'}
				/>
				<CusInput
					placeholder={'Last Name'}
					control={control}
					name={'lName'}
				/>
				<CusInput
					placeholder={'Email Address'}
					control={control}
					name={'email'}
				/>
				<CusInput
					placeholder={'Username'}
					control={control}
					name={'uName'}
				/>
				<CusInput
					placeholder={'Password'}
					control={control}
					name={'pass'}
				/>
				<CusRadioBtn
					options={options}
					control={control}
					name={'type'}
				/>
				<CusBtn content={'SIGN IN'} style={'primary'} type='submit' />
			</form>
		</div>
	);
};

export default RegisterForm;
