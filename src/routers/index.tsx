import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Dashboard from '@/views/dashboard';
import AllNews from '@/views/allNews';
import Wallet from '@/views/wallet';

export const rootRouter: RouteObject[] = [
	{
		path: 'dashboard',
		element: <Dashboard />,
	},
	{
		path: 'news',
		element: <AllNews />,
	},
	{
		path: 'wallet',
		element: <Wallet />,
	},
	{
		path: '/',
		element: <Navigate to="/dashboard" />,
	},
];

export const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};
