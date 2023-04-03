import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/createStore';
import { useEffect } from 'react';
import { clearAlert } from '@/redux/reducers/alert';
import { useDispatch } from 'react-redux';

export function AlertPopup() {
	const dispatch = useDispatch();
	const alert = useSelector((state: RootState) => state.alert);
	const { text, status } = alert;

	useEffect(() => {
		if (text) setTimeout(() => dispatch(clearAlert()), 2500);
	}, [alert]);

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
