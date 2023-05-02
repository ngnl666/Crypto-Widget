import { takeLatest } from 'redux-saga/effects';
import { handleSetAlert, handleClearAlert } from './handlers/alert';
import { handleSetUser, handleClearUser } from './handlers/user';
import { handleSetPrice } from './handlers/price';
import { SET_ALERT } from '../reducers/alert';
import { SET_USER } from '../reducers/user';
import { SET_PRICE } from '../reducers/price';

// watch all sagas
export function* watcherSaga() {
	yield takeLatest(SET_ALERT, () => handleSetAlert);
	yield takeLatest(SET_ALERT, () => handleClearAlert);
	yield takeLatest(SET_USER, () => handleSetUser);
	yield takeLatest(SET_USER, () => handleClearUser);
	yield takeLatest(SET_PRICE, () => handleSetPrice);
}
