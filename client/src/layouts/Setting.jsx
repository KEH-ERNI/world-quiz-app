const Setting = ({
	categories,
	search,
	setSearch,
	category,
	difficulty,
	setCategory,
	setDifficulty,
}) => {
	const difficultyChoices = ['Easy', 'Medium', 'Hard'];

	return (
		<div className='flex flex-col gap-2'>
			<div className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-lg ring-1 ring-inset ring-primary-20 p-2 shadow-lg flex flex-row items-center shadow-lg'>
				<input
					type='text'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					className='form-control pl-2 text-sm font-light bg-inputbg w-full  placeholder:text-primary-50 focus:outline-none'
					placeholder={`Search by quiz name`}
				/>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='rgba(199, 82, 42)'
					className='size-4'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
					/>
				</svg>
			</div>
			<div className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-lg ring-1 ring-inset ring-primary-20 p-2 shadow-lg flex flex-row items-center shadow-lg'>
				<select
					value={category}
					onChange={(e) => {
						setCategory(e.target.value);
					}}
					className='form-control bg-inputbg w-full focus:outline-none text-primary'
				>
					<option value='' disabled>
						Select Category
					</option>
					{categories.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			<div className='px-3 py-2.5 text-sm font-light bg-inputbg w-full rounded-lg ring-1 ring-inset ring-primary-20 p-2 shadow-lg flex flex-row items-center shadow-lg'>
				<select
					value={difficulty}
					onChange={(e) => {
						setDifficulty(e.target.value);
					}}
					className='form-control bg-inputbg w-full focus:outline-none text-primary'
				>
					<option value='' disabled>
						Select Difficulty
					</option>
					{difficultyChoices.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Setting;
