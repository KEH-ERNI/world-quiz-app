import React from 'react';
import { Controller } from 'react-hook-form';

const CusTextarea = ({ name, placeholder, control, rows = 4, cols = 50 }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div>
					<textarea
						{...field}
						name={name}
						id={name}
						className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-md ring-1 ring-inset ring-primary-50 p-2 text-gray-900 focus:outline-none placeholder:text-primary-35 shadow-lg'
						placeholder={placeholder}
						rows={rows}
						cols={cols}
					/>
				</div>
			)}
		/>
	);
};

export default CusTextarea;
