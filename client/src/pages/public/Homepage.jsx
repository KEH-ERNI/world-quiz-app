import React, { useState } from 'react';
import { CusBtn, CusModal } from '../../components';
import { RegisterForm, LoginForm } from '../../forms';

const Homepage = () => {
	const [theme, setTheme] = useState('light');
	const [openNav, setOpenNav] = useState(false);
	const [openSign, setOpenSign] = useState(false);
	const [openLog, setOpenLog] = useState(false);



	return (
		<main
			className={`container-fluid w-screen min-h-screen p-8 bg-bg-light text-txt-light flex flex-col`}
		>
			<nav className='flex items-center justify-between flex-wrap'>
				<div className='flex items-center flex-shrink-0'>
					<img src='/logo.png' className='w-24 sm:w-32 ' />
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
						action={() => setOpenNav(!openNav)}
					/>
				</div>
				<div
					className={`font-outfit  mt-4 flex flex-col w-full  flex-grow text-sm sm:flex sm:items-center sm:flex-grow-0 sm:w-auto  sm:flex-row sm:mt-0  md:flex-grow md:justify-center`}
				>
					<div
						className={`${
							openNav ? 'block' : 'hidden'
						} flex flex-col gap-4 sm:flex sm:block sm:flex-row sm:items-center md:justify-between md:w-full`}
					>
						<div className='flex flex-col gap-4 sm:flex-grow sm:flex-row sm:text-base md:text-lg md:w-1/2 md:justify-center md:gap-8 lg:gap-12'>
							<a
								className={`block text-txt-light sm:inline-block font-regular`}
							>
								Home
							</a>
							<a
								className={`block text-txt-light sm:inline-block font-regular`}
							>
								How It Works
							</a>
							<a
								className={`block text-txt-light sm:inline-block font-regular`}
							>
								Categories
							</a>
						</div>
						<div className='flex flex-col gap-2 sm:flex-row md:text-base'>
							<CusBtn
								content={'LOG IN'}
								theme={theme}
								style={'secondary'}
								action={() => setOpenLog(true)}
							/>
							<CusBtn
								content={'SIGN IN'}
								theme={theme}
								style={'primary'}
								action={() => {
									setOpenSign(true);
									setOpenNav(false);
								}}
							/>
						</div>
					</div>
				</div>
			</nav>
			<hr
				className={`${openNav ? 'mt-5 border-shadow' : 'border-none'}`}
			/>
			<section className='mt-4 font-lexend flex flex-col items-center justify-center flex-grow lg:flex-row lg:px-8 lg:gap-12'>
				<img src='/world.gif' className='w-64 sm:w-96 lg:order-2' />
				<div className='flex flex-col gap-3 lg:gap-5'>
					<div className='text-3xl font-medium sm:text-4xl lg:text-5xl'>
						<div>
							Know the <span className='text-primary'>World</span>
							,
						</div>
						<div>
							Quiz by <span className='text-primary'>Quiz</span>
						</div>
					</div>
					<div className='font-light text-sm sm:text-lg'>
						Discover the wonders of the world through engaging
						quizzes, expanding your knowledge and challenging your
						understanding of countries across the globe.
					</div>
					<CusBtn
						content={
							<div className='flex flex-row justify-center items-center sm:text-lg'>
								PLAY NOW
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 16 16'
									fill='currentColor'
									className='size-4'
								>
									<path
										fillRule='evenodd'
										d='M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
						}
						style={'primary'}
						action={() => setOpenLog(true)}
						lgW={'1/2'}
					/>
				</div>
				<CusModal
					content={
						<RegisterForm
							setOpenSign={setOpenSign}
							setOpenLog={setOpenLog}
						/>
					}
					openModal={openSign}
					setOpenModal={setOpenSign}
				/>
				<CusModal
					content={
						<LoginForm
							setOpenSign={setOpenSign}
							setOpenLog={setOpenLog}
						/>
					}
					openModal={openLog}
					setOpenModal={setOpenLog}
				/>
			</section>
		</main>
	);
};

export default Homepage;
