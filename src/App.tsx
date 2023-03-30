// import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Router } from './routers/index';
import { BgCanvas } from '@/layouts/bgCanvas/index';

function App() {
	return (
		<HashRouter>
			<BgCanvas />
			<Router />
		</HashRouter>
	);
}
export default App;
