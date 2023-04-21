// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//   )} />
// );

export default function Wallet() {
	return (
		<div className="h-full w-full">
			<p className="font-main text-4xl font-bold">Wallet</p>
		</div>
	);
}
