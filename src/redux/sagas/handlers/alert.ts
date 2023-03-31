import { put } from 'redux-saga/effects';
import { setAlert } from '@/redux/reducers/alert';
import type { AlertState } from '@/redux/types/index';

const ALERT_TIME_OUT = 3000;

export function* handleSetAlert(action: AlertState) {
	yield put(setAlert(action.text, action.status));
	yield setTimeout(() => put(setAlert('', '')), ALERT_TIME_OUT);
}
