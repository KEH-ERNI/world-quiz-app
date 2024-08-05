import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
	const { user } = useSelector((state) => state.auth);
	console.log('PrivateRoutes User:', user);
	if (!user) {
		return <Navigate to='/' />;
	}

	return <div>sasa{children}</div>;
};

export default PrivateRoutes;
