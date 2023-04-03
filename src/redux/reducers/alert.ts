import type { AlertState } from '../types/index';

export const SET_ALERT = 'SET_ALERT';

interface Actions extends AlertState {
	type: typeof SET_ALERT;
}

const initialState: AlertState = {
	text: '',
	status: 'success',
};

export const setAlert = (text: AlertState['text'], status: AlertState['status']) => ({
	type: SET_ALERT,
	text,
	status,
});

export const clearAlert = () => ({ type: SET_ALERT, ...initialState });

export default (state: AlertState = initialState, action: Actions) => {
	switch (action.type) {
		case SET_ALERT: {
			const { text, status } = action;
			return { ...state, text, status };
		}
		default:
			return state;
	}
};
