import React from 'react';
import { InstructorQuiz, StudentQuiz } from '../../layouts';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Quizzes = () => {
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { data } = useSelector((state) => state.quiz);
	const dispatch = useDispatch();

	const categoriesIcon = [
		{
			name: 'Geography',
			icon: 'geography.png',
		},
		{
			name: 'History',
			icon: 'history.png',
		},
		{
			name: 'Culture',
			icon: 'culture.png',
		},
		{
			name: 'Science and Nature',
			icon: 'science.png',
		},
		{
			name: 'Sports',
			icon: 'sports.png',
		},
		{
			name: 'Music and Entertainment',
			icon: 'music.png',
		},
		{
			name: 'Economics and Politics',
			icon: 'economic.png',
		},
		{
			name: 'Technology and Innovation',
			icon: 'technology.png',
		},
		{
			name: 'Current Affairs',
			icon: 'current.png',
		},
	];

	const onLogout = () => {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	return (
		<main
			className={`container-fluid min-w-screen min-h-screen p-8 bg-bg-light text-txt-light`}
		>
			<div className='relative pb-5'>
				<div
					onClick={() => setIsSidebarOpen(true)}
					className='cursor-pointer absolute'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='size-6'
					>
						<path
							fillRule='evenodd'
							d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
			</div>

			<div
				className={`font-lexend sidebar fixed top-0 bottom-0 left-0 p-2 w-full overflow-y-auto text-center bg-light shadow-lg flex flex-col justify-between ${
					isSidebarOpen ? '' : 'hidden'
				}`}
			>
				<div className='flex p-1 flex justify-right w-full flex-col'>
					<button
						className='bg-transparent px-0 py-0 flex items-right justify-end w-full '
						onClick={() => {
							setIsSidebarOpen(false);
						}}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>

					<img src={'logo.png'} className='w-full p-8' />
				</div>

				<div className='flex flex-col gap-5 items-center '>
					<img
						className='inline-block h-24 w-24 rounded-full bg-brown-light ring-2 ring-brown-light p-3 shadow-md'
						src={`${
							user.type == 'Instructor'
								? './teacher.png'
								: './student.png'
						}`}
					/>

					<div className='gap-0'>
						<div className='font-semibold'>
							{user.fName} {user.lName}
						</div>
						<div className='font-light text-sm'>{user.type}</div>
					</div>
				</div>
				<div className='flex flex-col gap-3 px-24 text-sm'>
					<div className='flex flex-row justify-left gap-2 items-center disabled pointer-cursor font-light'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
							/>
						</svg>
						Dashboard
					</div>
					<div className='flex flex-row justify-left gap-2 items-center disabled pointer-cursor font-medium text-primary'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='size-4'
						>
							<path
								fillRule='evenodd'
								d='M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z'
								clipRule='evenodd'
							/>
							<path d='M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z' />
						</svg>
						Quizzes
					</div>
					<div className='flex flex-row justify-left gap-2 items-center disabled pointer-cursor font-light'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
							/>
						</svg>
						Performance
					</div>
				</div>

				<div className='py-5 px-5 flex flex-col justify-center h-24'>
					<hr className='border-shadow' />
					<button
						className='h-full flex flex-row items-center justify-center gap-2 mt-5 font-light text-brown-light hover:text-dark text-sm bg-shadow focus:outline-none'
						onClick={() => onLogout()}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='size-4 hover:text-dark'
						>
							<path
								fillRule='evenodd'
								d='M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z'
								clipRule='evenodd'
							/>
						</svg>
						Log Out
					</button>
				</div>
			</div>

			<div className={`${isSidebarOpen ? 'hidden' : ''}`}>
				{user?.type === 'Instructor' && (
					<InstructorQuiz
						user={user}
						categories={categoriesIcon}
						dispatch={dispatch}
						data={data}
					/>
				)}
				{user?.type === 'Student' && (
					<StudentQuiz
						categories={categoriesIcon}
						dispatch={dispatch}
						data={data}
					/>
				)}
			</div>
		</main>
	);
};

export default Quizzes;
