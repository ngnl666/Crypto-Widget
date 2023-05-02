import { put } from 'redux-saga/effects';
import { setPrice } from '@/redux/reducers/price';
import type { PriceState } from '@/redux/types/index';

export function* handleSetPrice(action: PriceState[]) {
	yield put(setPrice(action));
}
