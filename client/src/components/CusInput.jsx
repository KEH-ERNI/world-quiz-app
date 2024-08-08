import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const CusInput = ({
	type = 'text',
	name,
	placeholder,
	control,
	onFileChange,
	error,
	rules,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field }) => (
				<div className='relative'>
					<input
						{...field}
						name={name}
						id={name}
						className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-md ring-1 ring-inset ring-primary-50 p-2 text-gray-900 focus:outline-none placeholder:text-primary-35 shadow-lg'
						placeholder={placeholder}
						type={
							type === 'password' && showPassword ? 'text' : type
						}
						onBlur={(e) => field.onBlur(e)}
						onChange={(e) => {
							field.onChange(e);
							if (type === 'file' && onFileChange) {
								onFileChange(e.target.files[0]);
							}
						}}
					/>

					{type === 'password' && (
						<span
							onClick={togglePasswordVisibility}
							className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
						>
							{showPassword ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='size-4 text-primary-50'
								>
									<path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
									<path
										fillRule='evenodd'
										d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='size-4 text-primary-50'
								>
									<path
										fillRule='evenodd'
										d='M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z'
										clipRule='evenodd'
									/>
									<path d='m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z' />
								</svg>
							)}
						</span>
					)}

					<p className='text-red-700 font-light text-xs ml-1'>
						{error?.message}
					</p>
				</div>
			)}
		/>
	);
};

export default CusInput;
