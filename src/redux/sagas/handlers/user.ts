import { put } from 'redux-saga/effects';
import { setUser } from '@/redux/reducers/user';
import type { UserState } from '@/redux/types/index';

export function* handleSetUser(action: UserState) {
	yield put(setUser(action));
}

export function* handleClearUser() {
	yield put(setUser({ token: '', displayName: '', email: '', photoURL: '', uid: '' }));
}
