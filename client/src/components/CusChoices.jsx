import { Controller } from 'react-hook-form';

const CusRadioBtn = ({ options, control, name }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div>
					{options.map((option, index) => {
						return (
							<div
								key={index}
								className={`mb-2 flex flex-row w-full align-center px-3 text-sm font-light rounded-md ring-1 ring-inset gap-2 ${
									field.value === option.text
										? 'ring-primary'
										: 'ring-primary-35'
								} p-2 text-gray-900 focus:outline-none placeholder:text-primary-35 shadow-lg`}
							>
								<input
									type='radio'
									id={option.text}
									name={field.name}
									className='mr-2 accent-primary'
									checked={field.value === option.text}
									onChange={() => field.onChange(option.text)}
								/>
								<label
									htmlFor={index}
									className={`flex flex-col items-center cursor-pointer`}
								>
									<div className='t font-lexend'>
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
