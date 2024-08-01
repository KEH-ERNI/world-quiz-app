import React from 'react';
import { Controller } from 'react-hook-form';

const CusSelect = ({ name, placeholder, control, options }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field }) => (
				<div className='bg-inputbg rounded-md ring-1 ring-inset ring-primary-50 p-2 text-gray-900 shadow-lg'>
					<select
						{...field}
						name={name}
						id={name}
						className='text-sm font-light bg-inputbg w-full focus:outline-none placeholder:text-primary-35'
					>
						<option value='' disabled>
							{placeholder}
						</option>
						{options.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			)}
		/>
	);
};

export default CusSelect;
