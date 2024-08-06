import { CusInput, CusBtn } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes, login } from '../redux/slices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setOpenSign, setOpenLog }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState();

	const { user, token } = useSelector((state) => state.auth);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			uname: '',
			pass: '',
		},
	});

	const onSubmit = async (data) => {
		try {
			await dispatch(login(data)).unwrap();
			dispatch(getQuizzes());
			reset();
		} catch (error) {
			setLoginError(error);
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
		<div>
			<div className='text-left pt-0 px-2 pb-2 font-lexend'>
				<div className='flex flex-col gap-1'>
					<div className='text-xl font-medium'>Log in</div>
					<div className='font-light text-sm'>
						Don't have an account?{' '}
						<a
							className='text-primary'
							onClick={() => {
								setOpenSign(true);
								setOpenLog(false);
								reset();
								setLoginError();
							}}
						>
							Sign in
						</a>
					</div>
				</div>

				<form
					className='mt-6 flex flex-col gap-2'
					onSubmit={handleSubmit(onSubmit)}
				>
					<CusInput
						placeholder={'Username'}
						name={'uname'}
						control={control}
						rules={{ required: 'Username is required.' }}
						error={errors.uname}
					/>
					<CusInput
						placeholder={'Password'}
						name={'pass'}
						control={control}
						rules={{ required: 'Password is required.' }}
						error={errors.pass}
					/>
					<p className='text-red-700 font-light text-xs ml-1 text-center'>
						{loginError}
					</p>
					<CusBtn
						content={'LOG IN'}
						style={'primary'}
						type={'submit'}
					/>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
