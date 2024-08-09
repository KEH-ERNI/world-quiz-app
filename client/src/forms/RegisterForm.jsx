import { CusInput, CusBtn, CusRadioBtn } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ setOpenSign, setOpenLog }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [signError, setSignError] = useState();

	const { user, token } = useSelector((state) => state.auth);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
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
			value: 'Instructor',
			imageUrl: 'teacher.png',
			altText: 'Instructor',
		},
	];

	const onSubmit = async (data) => {
		try {
			await dispatch(register(data)).unwrap();
			dispatch(getQuizzes());
			reset();
		} catch (error) {
			setSignError(error);
			reset();
		}
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
					<a
						className='text-primary'
						onClick={() => {
							setOpenSign(false);
							setOpenLog(true);
							reset();
							setSignError();
						}}
					>
						Log in
					</a>
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
					rules={{ required: 'First name is required.' }}
					error={errors.fName}
				/>
				<CusInput
					placeholder={'Last Name'}
					control={control}
					name={'lName'}
					rules={{ required: 'Last name is required.' }}
					error={errors.lName}
				/>
				<CusInput
					placeholder={'Email Address'}
					control={control}
					name={'email'}
					rules={{ required: 'Email is required.' }}
					error={errors.email}
				/>
				<CusInput
					placeholder={'Username'}
					control={control}
					name={'uName'}
					rules={{ required: 'Username is required.' }}
					error={errors.uName}
				/>
				<CusInput
					placeholder={'Password'}
					control={control}
					name={'pass'}
					rules={{ required: 'Password is required.' }}
					error={errors.pass}
					type='password'
				/>
				<CusRadioBtn
					options={options}
					control={control}
					name={'type'}
					rules={{ required: 'User role is required.' }}
					error={errors.type}
				/>
				<p className='text-red-700 font-light text-xs ml-1 text-center'>
					{signError}
				</p>
				<CusBtn content={'SIGN IN'} style={'primary'} type='submit' />
			</form>
		</div>
	);
};

export default RegisterForm;
