import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);

		if (credential) {
			const user = result.user;
			const token = credential.accessToken;
			const { displayName, email, photoURL, uid } = user;

			return { token, displayName, email, photoURL, uid };
		}
	} catch (error: any) {
		console.log(`${error.code}- ${error.message}`);
	}
};

export const signInWithEmail = async (e_mail: string, password: string) => {
	try {
		const result = await signInWithEmailAndPassword(auth, e_mail, password);
		const user = result.user;

		if (user) {
			const token = await user.getIdToken();
			const uid = user.uid;
			return { token, displayName: 'Admin', email: 'admin@email.com', photoURL: '', uid };
		}
	} catch (error: any) {
		console.log(`${error.code}- ${error.message}`);
	}
};

export const signOut = async () => {
	try {
		await auth.signOut();
		return true;
	} catch (error: any) {
		console.log(`${error.code}- ${error.message}`);
	}
};

export const checkIfTokenExpired = async () => {
	try {
		const user = auth.currentUser;

		if (user) {
			const idTokenResult = await user.getIdTokenResult();
			const tokenExpirationTime = idTokenResult.expirationTime;
			const now = new Date();

			return now >= new Date(tokenExpirationTime);
		} else {
			return true;
		}
	} catch (error: any) {
		console.log(`${error.code}- ${error.message}`);
	}
};
