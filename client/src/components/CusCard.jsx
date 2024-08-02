import React from 'react';

const CusCard = ({
	title,
	quantity,
	description,
	type,
	difficulty,
	code,
	actions,
	filename,
}) => {
	const baseURL = 'https://localhost:7045';

	return (
		<div className='bg-light shadow-custom p-4 rounded-xl flex flex-col text-sm font-light gap-2'>
			<div>
				<img src={`${baseURL}/images/${filename}`} />
			</div>
			<div className='flex justify-between items-center flex-row'>
				<div>{title}</div>
				<div>{quantity}</div>
			</div>
			<div>{description}</div>
			<div className='flex justify-between items-center flex-row'>
				<div>{type}</div>
				<div>{difficulty}</div>
				<div>{code}</div>
			</div>
			<hr />
			{actions}
		</div>
	);
};

export default CusCard;
