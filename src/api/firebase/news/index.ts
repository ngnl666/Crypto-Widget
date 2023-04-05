import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getNews = async (page: number) => {
	const newsCollection = collection(db, 'news');
	const q = query(newsCollection, orderBy('date', 'desc'));
	const docSnap = await getDocs(q);
	const res = docSnap.docs.map((doc) => doc.data());
	return res.slice(page * 5, page * 5 + 5);
};
