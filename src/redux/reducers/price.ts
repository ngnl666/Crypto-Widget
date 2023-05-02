import type { PriceState } from '../types/index';

export const SET_PRICE = 'SET_PRICE';

interface Actions {
	type: typeof SET_PRICE;
	payload: PriceState;
}

const initialState: PriceState = {};

export const setPrice = (payload: PriceState[]) => ({
	type: SET_PRICE,
	payload,
});

export default (state: PriceState = initialState, action: Actions) => {
	switch (action.type) {
		case SET_PRICE: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
};
