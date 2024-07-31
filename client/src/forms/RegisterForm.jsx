import { CusInput, CusBtn, CusRadioBtn } from '../components';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			fname: '',
			lname: '',
			email: '',
			uname: '',
			pass: '',
			type: '',
		},
	});
	const options = [
		{
			value: 'student',
			imageUrl: 'student.png',
			altText: 'Student',
		},
		{
			value: 'teacher',
			imageUrl: 'teacher.png',
			altText: 'Teacher',
		},
	];

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div
			className='text-left pt-0 px-2 pb-2 font-lexend'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-1'>
				<div className='text-xl font-medium'>Sign in</div>
				<div className='font-light text-sm'>
					Already have an account?{' '}
					<a className='text-primary'>Log in</a>
				</div>
			</div>

			<form className='mt-6 flex flex-col gap-2'>
				<CusInput
					placeholder={'First Name'}
					control={control}
					name={'fname'}
				/>
				<CusInput
					placeholder={'Last Name'}
					control={control}
					name={'lname'}
				/>
				<CusInput
					placeholder={'Email Address'}
					control={control}
					name={'email'}
				/>
				<CusInput
					placeholder={'Username'}
					control={control}
					name={'uname'}
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
