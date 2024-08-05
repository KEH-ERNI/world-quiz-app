import { CusBtn, CusModal } from '../../components';
import { useState } from 'react';
import { ItemForm } from '../../forms';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getQuiz } from '../../redux/slices';
const QuizItem = () => {
	const [openAdd, setOpenAdd] = useState(false);
	const dispatch = useDispatch();
	const { quizId } = useParams();
	const baseURL = 'https://localhost:7045';

	const { loading, current, error } = useSelector((state) => state.quiz);

	useEffect(() => {
		if (quizId) {
			dispatch(getQuiz(quizId));
		}
	}, [quizId, dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (current) {
		let questions = current.questions;
		return (
			<div className='container-fluid w-screen min-h-screen p-8 bg-bg-light text-txt-light font-lexend flex flex-col gap-4'>
				<div className='rounded-lg bg-white p-2 shadow-custom'>
					<img
						src={`https://localhost:7045/images/${current.imageName}`}
						className='w-full h-40'
					/>
				</div>
				<div className='flex flex-col gap-1 text-sm font-light'>
					<div className='flex flex-row justify-between items-center'>
						<div className='text-xl font-semibold'>
							{current.name}
						</div>
						<div>{current.quantity}</div>
					</div>

					<div>{current.description}</div>
					<div className='flex flex-row justify-between items-center'>
						<div>{current.category}</div>
						<div>{current.type}</div>
						<div>{current.difficulty}</div>
					</div>

					<CusBtn
						style={'primary'}
						content={'+ ADD ITEM'}
						action={() => setOpenAdd(true)}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					{questions.map((question, index) => {
						let options = question.options;
						return (
							<div
								className='bg-white p-3 shadow-custom rounded-lg text-sm font-light'
								key={index}
							>
								<div className='text-xs'>{index + 1}</div>
								<div>{question.text}</div>
								<hr />
								{options.map((option, index) => (
									<div key={index}>- {option.text}</div>
								))}
								<div>
									<button>edit</button>
									<button>delete</button>
								</div>
							</div>
						);
					})}
				</div>

				<CusModal
					content={
						<ItemForm setOpenModal={setOpenAdd} quizID={quizId} />
					}
					openModal={openAdd}
					setOpenModal={setOpenAdd}
				/>

				<CusModal
					content={
						<ItemForm
							setOpenModal={setOpenAdd}
							quizID={quizId}
							data={current}
						/>
					}
					openModal={openAdd}
					setOpenModal={setOpenAdd}
				/>
			</div>
		);
	}
};

export default QuizItem;
