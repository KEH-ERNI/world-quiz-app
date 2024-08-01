import React, { useState } from 'react';
import { CusBtn, CusModal } from '../../components';
import { QuizForm } from '../../forms';

const Quizzes = () => {
	const [openAdd, setOpenAdd] = useState(false);
	return (
		<main
			className={`container-fluid min-w-screen min-h-screen p-8 bg-bg-light text-txt-light`}
		>
			<section className='mt-4 font-lexend'>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-2'>
						<div className='text-3xl font-medium text-primary'>
							Quizzes
						</div>
						<div className='font-light text-sm'>
							Start creating your quizzes today and make a lasting
							impact on your students' educational journey!
						</div>
					</div>
					<div className='bg-shadow p-3 flex rounded-xl shadow-xl flex-col font-light text-sm gap-2'>
						<div className='bg-light p-3'>search bar</div>
						<div className='bg-light p-3'>category</div>
						<div className='bg-light p-3'>difficulty</div>
						<CusBtn
							content={'+ ADD QUIZ'}
							style={'primary'}
							action={() => setOpenAdd(true)}
						/>
					</div>
				</div>
				<CusModal
					content={<QuizForm />}
					openModal={openAdd}
					setOpenModal={setOpenAdd}
				/>
			</section>
		</main>
	);
};

export default Quizzes;
