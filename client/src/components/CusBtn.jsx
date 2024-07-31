import React from 'react';

const CusBtn = ({ theme, content, style, w, action, type = 'button' }) => {
	const btnStyles = {
		primary: `bg-primary text-light border-none border-primary hover:outline-none hover:bg-primdark focus:outline-none w-${w}`,
		secondary: `bg-transparent text-primary border-1 border-primary hover:outline-none focus:outline-none focus:border-primary hover:bg-shadow w-${w}`,
		tertiary: `bg-transparent text-txt-${theme} border-none hover:outline-none hover:bg-shadow focus:outline-none  w-${w}`,
	};
	return (
		<button className={btnStyles[style]} onClick={action} type={type}>
			{content}
		</button>
	);
};

export default CusBtn;
