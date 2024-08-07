import React from 'react';
import { Controller } from 'react-hook-form';

const CusTextarea = ({
	name,
	placeholder,
	control,
	rows = 4,
	cols = 50,
	none,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<textarea
					{...field}
					name={name}
					id={name}
					className={`${
						none
							? ' flex'
							: 'px-3 py-2.5  rounded-md ring-1 ring-inset ring-primary-50 p-2  shadow-lg'
					} w-full bg-inputbg focus:outline-none placeholder:text-primary-35 text-sm font-light text-gray-900 `}
					placeholder={placeholder}
					rows={rows}
					cols={cols}
				/>
			)}
		/>
	);
};

export default CusTextarea;
