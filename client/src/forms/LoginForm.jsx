import { CusInput, CusBtn } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, token, loading, error } = useSelector((state) => state.auth);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			uname: '',
			pass: '',
		},
	});

	const onSubmit = async (data) => {
		dispatch(login(data));
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
						<a className='text-primary'>Sign in</a>
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
					/>
					<CusInput
						placeholder={'Password'}
						name={'pass'}
						control={control}
					/>
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
