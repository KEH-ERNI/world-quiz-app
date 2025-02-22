import React from 'react';
import { useForm } from 'react-hook-form';
const CusModal = ({ title, content, openModal, setOpenModal }) => {
	const { reset } = useForm();

	return (
		<div
			className={`flex items-center justify-center relative  z-10 ${
				openModal ? 'block' : 'hidden'
			}`}
			aria-labelledby={title}
			role='dialog'
			aria-modal={'true'}
		>
			<div
				className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity'
				aria-hidden='true'
			></div>

			<div className='fixed flex justify-items items-center inset-0 z-10 min-w-screen overflow-y-auto '>
				<div className='flex min-h-full items-center justify-center p-4 text-center w-full'>
					<div className='relative w-full sm:w-1/2 lg:w-2/6 transform overflow-hidden rounded-lg bg-light shadow-xl transition-all '>
						<div className='p-5 flex flex-col'>
							<div className='flex min-w-full justify-end '>
								<button
									className='bg-transparent px-0 py-0'
									onClick={() => {
										setOpenModal(false);
										reset();
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
							</div>
							{content}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CusModal;
