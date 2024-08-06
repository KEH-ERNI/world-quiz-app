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
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field }) => (
				<div>
					<input
						{...field}
						name={name}
						id={name}
						className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-md ring-1 ring-inset ring-primary-50 p-2 text-gray-900 focus:outline-none placeholder:text-primary-35 shadow-lg'
						placeholder={placeholder}
						type={type}
						onBlur={(e) => field.onBlur(e)}
						onChange={(e) => {
							field.onChange(e);
							if (type === 'file' && onFileChange) {
								onFileChange(e.target.files[0]);
							}
						}}
					/>

					<p className='text-red-700 font-light text-xs ml-1'>
						{error?.message}
					</p>
				</div>
			)}
		/>
	);
};

export default CusInput;
