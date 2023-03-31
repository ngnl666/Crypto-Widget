import { takeLatest } from 'redux-saga/effects';
import { handleSetAlert } from './handlers/alert';
import { SET_ALERT } from '../reducers/alert';

// watch all sagas
export function* watcherSaga() {
	yield takeLatest(SET_ALERT, () => handleSetAlert);
}
