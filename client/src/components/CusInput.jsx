import { Controller } from 'react-hook-form';
const CusInput = ({
	type = 'text',
	name,
	placeholder,
	control,
	onFileChange,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div>
					<input
						{...field}
						name={name}
						id={name}
						className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-md ring-1 ring-inset ring-primary-50 p-2 text-gray-900 focus:outline-none placeholder:text-primary-35 shadow-lg'
						placeholder={placeholder}
						type={type}
						onChange={(e) => {
							field.onChange(e);
							if (type === 'file' && onFileChange) {
								onFileChange(e.target.files[0]);
							}
						}}
					/>
				</div>
			)}
		/>
	);
};

export default CusInput;
