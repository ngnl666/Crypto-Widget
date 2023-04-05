import { HashRouter } from 'react-router-dom';
import { Router } from './routers/index';
import { BgCanvas } from '@/layouts/bgCanvas/index';
import AlertPopup from '@/layouts/alertPopup/alertPopup';

function App() {
	return (
		<HashRouter>
			<AlertPopup></AlertPopup>
			<BgCanvas>
				<Router />
			</BgCanvas>
		</HashRouter>
	);
}
export default App;
