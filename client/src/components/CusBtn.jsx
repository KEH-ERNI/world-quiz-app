import React from 'react';

const CusBtn = ({
	theme,
	content,
	style,
	w,
	action,
	type = 'button',
	color,
	h,
	p,
	font,
	lgW,
}) => {
	const btnStyles = {
		primary: `bg-primary text-light border-none border-primary hover:outline-none hover:bg-primdark focus:outline-none w-${w} shadow-md h-${h} py-${p} text-${font} lg:w-${lgW}`,
		secondary: `bg-transparent text-primary border-1 border-primary hover:border-primary hover:outline-none focus:outline-none focus:border-primary hover:bg-shadow w-${w}`,
		tertiary: `bg-transparent text-txt-${theme} border-none hover:outline-none hover:bg-shadow focus:outline-none w-${w}`,
		fourth: `bg-${color} text-dark border-none border-primary hover:outline-none hover:bg-white focus:outline-none w-${w}`,
		fifth: `bg-primary text-light border-none border-primary hover:outline-none hover:bg-primdark focus:outline-none w-full shadow-md h-${h} py-${p} text-${font} lg:w-48`,
	};
	return (
		<button className={btnStyles[style]} onClick={action} type={type}>
			{content}
		</button>
	);
};

export default CusBtn;
