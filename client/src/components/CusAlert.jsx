import React from 'react';


const CusAlert = ({
	type,
	message,
	description,
}) => {
	const alertStyles = {
		information: 'text-blue-900 bg-blue-100 border border-blue-200',
		success: 'text-green-900 bg-green-100 border border-green-200',
		warning: 'text-yellow-900 bg-yellow-100 border border-yellow-200',
		critical: 'text-red-900 bg-red-100 border border-red-200',
	};

	const iconPaths = {
		information:
			'M14.1667 17h-3.3334c-.5 0-.8333-.3146-.8333-.7865 0-.472.3333-.7865.8333-.7865H11.5c.0833 0 .1667-.0787.1667-.1573v-3.5394c0-.0786-.0834-.1573-.1667-.1573h-.6667c-.5 0-.8333-.3146-.8333-.7865S10.3333 10 10.8333 10h.8334c.9166 0 1.6666.7079 1.6666 1.573v3.7753c0 .0787.0834.1573.1667.1573h.6667c.5 0 .8333.3146.8333.7865 0 .472-.3333.7079-.8333.7079zM12.3 6c.6933 0 1.3.6067 1.3 1.3s-.52 1.3-1.3 1.3S11 7.9933 11 7.3 11.6067 6 12.3 6zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2',
		success:
			'M8.445 12.6675A.9.9 0 0 0 7.1424 13.91l2.5726 2.7448c.3679.3856.9884.3689 1.335-.036l5.591-7.0366a.9.9 0 0 0-1.3674-1.1705l-4.6548 5.9132a.4.4 0 0 1-.607.0252l-1.567-1.6826zM1.9995 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z',
		warning:
			'M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z',
		critical:
			'M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z',
	};

	return (
		<div className='relative'>
			<div
				className={`p-4 ${alertStyles[type]} border rounded-md absolute bottom-0 w-full left-1/2 transform -translate-x-1/2`}
			>
				<div className='flex justify-between flex-wrap'>
					<div className='w-0 flex-1 flex'>
						<div className='mr-3 pt-1'>
							<svg
								width='26'
								height='26'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
							>
								<path d={iconPaths[type]}></path>
							</svg>
						</div>
						<div>
							<h4 className='text-md leading-6 font-medium'>
								{message}
							</h4>
							<p className='text-sm'>{description}</p>
						</div>
					</div>
					<div>
						<button
							type='button'
							className='rounded-md focus:outline-none focus:ring-2 focus:ring-current'
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
							>
								<path d='M17.6555 6.3331a.9.9 0 0 1 .001 1.2728l-4.1032 4.1085a.4.4 0 0 0 0 .5653l4.1031 4.1088a.9002.9002 0 0 1 .0797 1.1807l-.0806.092a.9.9 0 0 1-1.2728-.0009l-4.1006-4.1068a.4.4 0 0 0-.5662 0l-4.099 4.1068a.9.9 0 1 1-1.2738-1.2718l4.1027-4.1089a.4.4 0 0 0 0-.5652L6.343 7.6059a.9002.9002 0 0 1-.0796-1.1807l.0806-.092a.9.9 0 0 1 1.2728.0009l4.099 4.1055a.4.4 0 0 0 .5662 0l4.1006-4.1055a.9.9 0 0 1 1.2728-.001z'></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CusAlert;
