import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { Dashboard } from '@/views/dashboard';
import { AllNews } from '@/views/allNews';

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
		path: '/',
		element: <Navigate to="/dashboard" />,
	},
];

export const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};
