import { storage } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { addDoc, getDocs, updateDoc, deleteDoc, collection, serverTimestamp, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

export interface UserWalletDoc {
	createdAt: Date;
	currency: string;
	uid: string;
	value: number;
}

export const getCryptoIcon = async (coin: string): Promise<string | undefined> => {
	try {
		const url = await getDownloadURL(ref(storage, `crypto-icons/${coin}.svg`));
		return url;
	} catch (e: unknown) {
		const url = await getDownloadURL(ref(storage, 'crypto-icons/generic.svg'));
		return url;
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

export const updateUserWalletDoc = async (data: Omit<UserWalletDoc, 'createdAt'>) => {
	try {
		const userCollection = collection(db, 'user');
		const q = query(userCollection, where('uid', '==', data.uid), where('currency', '==', data.currency));
		const docSnap = await getDocs(q);
		const doc = docSnap.docs[0];
		await updateDoc(doc.ref, data);
		return true;
	} catch (e: unknown) {
		console.log(e);
	}
};

export const deleteUserWalletDoc = async (uid: string, currency: string) => {
	try {
		const userCollection = collection(db, 'user');
		const q = query(userCollection, where('uid', '==', uid), where('currency', '==', currency));
		const docSnap = await getDocs(q);
		const doc = docSnap.docs[0];
		await deleteDoc(doc.ref);
		return true;
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
