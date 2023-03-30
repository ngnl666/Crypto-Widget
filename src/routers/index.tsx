import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { Dashboard } from '@/views/dashboard';

export const rootRouter: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/dashboard" />,
	},
	{
		path: 'dashboard',
		element: <Dashboard />,
	},
];

export const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};
