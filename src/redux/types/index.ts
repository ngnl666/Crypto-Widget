export interface AlertState {
	text: string;
	status: 'success' | 'info' | 'warning' | 'error';
}

export interface UserState {
	token?: string;
	displayName: string | null;
	email: string | null;
	photoURL: string | null;
	uid: string;
}
