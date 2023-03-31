import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { setAlert } from '@/redux/reducers/alert';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (credential) {
			const token = credential.accessToken;
			const user = result.user;
			console.log(token, user);
			console.log(auth.currentUser);
			// 這要放到 下方函式
			auth.onAuthStateChanged((user) => {
				if (user) {
					user.getIdTokenResult().then((idTokenResult) => {
						const tokenExpirationTime = idTokenResult.expirationTime;
						// const now = new Date().getTime();
						console.log(idTokenResult, tokenExpirationTime);

						// if (now >= tokenExpirationTime) {
						// 	// 如果token已過期，則導航到登錄頁面
						// 	// 或調用方法重新驗證用戶
						// }
					});
				}
			});
		}
	} catch (error: any) {
		setAlert(`${error.code}- ${error.message}`, 'error');
	}
};

// export const checkIfTokenExpired = async (token: string) => {
// 	try {
// 		const decodedToken = await auth.currentUser.getIdToken(token);
// 	} catch (error: any) {
// 		setAlert('Token 已過期，請重新登入！', 'warning');
// 	}
// };
