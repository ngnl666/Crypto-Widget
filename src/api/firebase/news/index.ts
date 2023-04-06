import { collection, orderBy, query, getDocs, startAfter, limit, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getNews = async (last?: DocumentData) => {
	const docs = last
		? query(collection(db, 'news'), orderBy('date', 'desc'), startAfter(last), limit(5))
		: query(collection(db, 'news'), orderBy('date', 'desc'), limit(5));
	const docSnap = await getDocs(docs);
	const result = docSnap.docs.map((doc) => doc.data());
	return [result, docSnap.docs[docSnap.docs.length - 1]];
};
