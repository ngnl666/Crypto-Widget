import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
	apiKey,
	authDomain: 'crypto-dashboard-d29d0.firebaseapp.com',
	projectId: 'crypto-dashboard-d29d0',
	storageBucket: 'crypto-dashboard-d29d0.appspot.com',
	messagingSenderId: '1006667459536',
	appId: '1:1006667459536:web:6c3c37236c1e0c983d67d5',
	measurementId: 'G-G6F35F19JK',
};

// Initialize Firebase & Cloud Storage
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

// const getCryptoIconURL = async (coin: string) => {
// 	try {
// 		const url = await getDownloadURL(ref(storage, `crypto-icons/${coin}.svg`));
// 		return url;
// 	} catch (e: any) {
// 		switch (e.code) {
// 			case 'storage/object-not-found':
// 				showErrorMsg('檔案不存在');
// 				break;
// 			case 'storage/unauthorized':
// 				showErrorMsg('使用者沒有權限存取檔案');
// 				break;
// 			case 'storage/canceled':
// 				showErrorMsg('使用者取消上傳檔案');
// 				break;
// 			case 'storage/unknown':
// 				showErrorMsg('發生未知錯誤');
// 				break;
// 		}
// 		return '';
// 	}
// };

// const showErrorMsg = (msg: string) => {
// 	ElNotification({
// 		title: 'Firebase 錯誤訊息',
// 		message: msg,
// 		type: 'error',
// 	});
// };

// return {
// 	getCryptoIconURL,
// };
