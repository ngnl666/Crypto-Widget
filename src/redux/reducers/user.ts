import type { UserState } from '../types/index';

export const SET_USER = 'SET_USER';

interface Actions extends UserState {
	type: typeof SET_USER;
}

const initialState: UserState = JSON.parse(localStorage.getItem('user')!) ?? {
	token: '',
	displayName: '',
	email: '',
	photoURL: '',
	uid: '',
};

export const setUser = (userInfo: UserState) => ({ type: SET_USER, ...userInfo });

export const clearUser = () => ({ type: SET_USER, ...initialState });

export default (state: UserState = initialState, action: Actions) => {
	switch (action.type) {
		case SET_USER: {
			const { token, displayName, email, photoURL, uid } = action;
			return { ...state, token, displayName, email, photoURL, uid };
		}
		default:
			return state;
	}
};
