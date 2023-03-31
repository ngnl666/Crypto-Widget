import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/createStore';

export function AlertPopup() {
	const alert = useSelector((state: RootState) => state.alert);
	const { text, status } = alert;

	if (text && status) {
		return (
			<Alert
				variant="filled"
				severity={status}
				sx={{
					position: 'fixed',
					bottom: 60,
					right: 15,
					zIndex: 10,
				}}
			>
				{text}
			</Alert>
		);
	} else {
		return <></>;
	}
}
