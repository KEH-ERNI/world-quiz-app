import React, { useState } from 'react';

import { CusBtn } from '../../components';
const Homepage = () => {
	const [theme, setTheme] = useState('light');

	return (
		<main
			className={`container-fluid w-screen min-h-screen p-8 bg-bg-${theme} text-txt-${theme}`}
		>
			<nav className='flex items-center justify-between flex-wrap '>
				<div className='flex items-center flex-shrink-0'>
					<img src='/logo.png' className='w-24' />
				</div>
				<div className='block sm:hidden'>
					<CusBtn
						content={
							<svg
								className='fill-current h-3 w-3'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<title>Menu</title>
								<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
							</svg>
						}
						theme={theme}
						style={'tertiary'}
					/>
				</div>
				<div
					className={`mt-4 flex flex-col w-full bg-bg-${theme} block flex-grow text-sm gap-4 sm:flex sm:items-center sm:w-auto  sm:flex-row`}
				>
					<div className='flex flex-col gap-4 sm:flex-grow sm:flex-row'>
						<a
							className={`block text-txt-${theme} sm:inline-block`}
						>
							Home
						</a>
						<a
							className={`block text-txt-${theme} sm:inline-block`}
						>
							How It Works
						</a>
						<a
							className={`block text-txt-${theme} sm:inline-block`}
						>
							Categories
						</a>
					</div>
					<div className='flex flex-col gap-2 sm:flex-row'>
						<CusBtn
							content={'LOG IN'}
							theme={theme}
							style={'secondary'}
						/>
						<CusBtn
							content={'SIGN IN'}
							theme={theme}
							style={'primary'}
						/>
					</div>
				</div>
				<div></div>
			</nav>
		</main>
	);
};

export default Homepage;
