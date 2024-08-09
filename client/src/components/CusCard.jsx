import { useState } from 'react';
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

	const [textToCopy, setTextToCopy] = useState(code);
	const [copySuccess, setCopySuccess] = useState('');

	const handleCopyClick = async () => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopySuccess('Text copied to clipboard!');
			setTimeout(() => setCopySuccess(''), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
			setCopySuccess('Failed to copy text.');
			setTimeout(() => setCopySuccess(''), 2000);
		}
	};

	return (
		<div className='bg-light shadow-custom p-4 rounded-xl flex flex-col text-sm font-light gap-1 font-lexend lg:h-full xl:h-96'>
			<div className='w-full'>
				<img
					src={`${baseURL}/images/${filename}`}
					className='sm:w-full sm:h-32 sm:object-cover'
				/>
			</div>
			<div className='flex justify-between items-center flex-row mt-1'>
				<div className='font-medium sm:text-lg'>{title}</div>
				<div className='text-xs sm:text-sm'>{quantity} items</div>
			</div>
			<div className='text-xs sm:text-sm lg:flex-grow'>{description}</div>
			<div className='flex justify-between items-center flex-row text-xs gap-1 w-full'>
				<div className='flex flex-row items-center w-full px-0 sm:text-sm '>
					<svg
						className='w-5 h-5 text-gray-800 dark:text-dark '
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeWidth='1'
							d='M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5'
						/>
					</svg>
					{type}
				</div>
				<div className='flex items-center gap-1  px-0 mr-2 sm:w-full justify-center sm:text-sm'>
					<svg
						className='w-3 h-3 text-gray-800 dark:text-dark'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path d='M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z' />
					</svg>

					{difficulty == 'Medium' ? 'Med' : difficulty}
				</div>

				<div className='flex items-center gap-1 px-0 sm:w-full justify-end text-right  sm:text-sm'>
					<button
						onClick={handleCopyClick}
						className='bg-transparent px-0 focus:outline-none flex w-full justify-end items-end text-right border-none'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-4 text-right'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
							/>
						</svg>
					</button>
					<input
						value={code}
						onChange={(e) => setTextToCopy(e.target.value)}
						className='w-12 bg-transparent text-right'
					/>
				</div>
			</div>
			<hr className='border-shadow mb-1' />
			{actions}
		</div>
	);
};

export default CusCard;
