import React from 'react';

const CusBtn = ({ theme, content, style, w }) => {
	const btnStyles = {
		primary: `bg-primary text-light border-none border-primary hover:outline-none hover:bg-shadow focus:outline-none w-${w}`,
		secondary: `bg-transparent text-primary border-1 border-primary hover:bg-shadow w-${w}`,
		tertiary: `bg-transparent text-txt-${theme} border-none hover:outline-none hover:bg-shadow focus:outline-none  w-${w}`,
	};
	return <button className={btnStyles[style]}>{content}</button>;
};

export default CusBtn;
