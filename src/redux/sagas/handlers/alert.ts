import { put } from 'redux-saga/effects';
import { setAlert } from '@/redux/reducers/alert';
import type { AlertState } from '@/redux/types/index';

export function* handleSetAlert(action: AlertState) {
	yield put(setAlert(action.text, action.status));
}

export function* handleClearAlert() {
	yield put(setAlert('', 'success'));
}
