import { Controller } from 'react-hook-form';

const CusRadioBtn = ({ options, control, name }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className='flex space-x-4'>
					{options.map((option) => {
						console.log(field.value === option.isCorrect);
						return (
							<div
								key={option.id}
								className='flex flex-row items-center justify-between'
							>
								<input
									type='radio'
									id={option.text}
									name={field.name}
									// className='hidden'
									checked={field.value === option.text}
									onChange={() => field.onChange(option.text)}
								/>
								<label
									htmlFor={option.id}
									className={`flex flex-col items-center cursor-pointer ${
										field.value === option.text
											? 'border-primary-50'
											: 'border-gray-300'
									} border-2 p-2 rounded-md`}
								>
									{/* <img
									src={option.imageUrl}
									alt={option.altText}
									className={` w-1/2 h-full ${
										field.value === option.value
											? 'opacity-100'
											: 'opacity-50'
									}`}
								/> */}
									<div className='text-xs font-lexend'>
										{option.text}
									</div>
								</label>
							</div>
						);
					})}
				</div>
			)}
		/>
	);
};

export default CusRadioBtn;
