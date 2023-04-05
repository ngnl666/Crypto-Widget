import { storage } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { addDoc, getDocs, collection, serverTimestamp, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

export interface UserWalletDoc {
	change: number;
	createdAt: Date;
	currency: string;
	price: number;
	uid: string;
	value: number;
}

export const getCryptoIcon = async (coin: string): Promise<string | undefined> => {
	try {
		const url = await getDownloadURL(ref(storage, `crypto-icons/${coin}.svg`));
		return url;
	} catch (e: unknown) {
		console.log(e);
	}
};

export const addUserWalletDoc = async (data: Omit<UserWalletDoc, 'createdAt'>) => {
	try {
		const userCollection = collection(db, 'user');
		const docRef = await addDoc(userCollection, {
			...data,
			createdAt: serverTimestamp(),
		});
		return docRef;
	} catch (e: unknown) {
		console.log(e);
	}
};

export const getUserWalletDoc = async (uid: string) => {
	try {
		const userCollection = collection(db, 'user');
		const q = query(userCollection, where('uid', '==', uid));
		const docSnap = await getDocs(q);
		return docSnap.docs.map((doc) => doc.data()) as UserWalletDoc[];
	} catch (e: unknown) {
		console.log(e);
	}
};
