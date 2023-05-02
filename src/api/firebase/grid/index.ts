import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import { CompLayout } from '@/views/dashboard';

export const storeGridImageAndLayout = async (uid: string, file: string, layout: Array<CompLayout>) => {
	try {
		// upload grid layout snapshot to firebase storage
		const timestamp = +new Date();
		const refDoc = ref(storage, `grid/${uid}/${timestamp}`);
		await uploadString(refDoc, file, 'data_url');

		// store grid layout
		const url = await getGridImage(uid, timestamp.toString());
		const grid: Array<Array<CompLayout>> = localStorage.getItem('grid') ? JSON.parse(localStorage.getItem('grid')!) : [];
		localStorage.setItem('grid', JSON.stringify([...grid, { url, layout }]));
		return true;
	} catch (_) {
		return false;
	}
};

const getGridImage = async (uid: string, fileName: string) => {
	try {
		const url = await getDownloadURL(ref(storage, `grid/${uid}/${fileName}`));
		return url;
	} catch (e: unknown) {
		console.log(e);
	}
};
