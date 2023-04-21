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

export const defaultLayout: Array<CompLayout> = [
	{
		w: 6,
		h: 3,
		x: 0,
		y: 0,
		i: '1680690674294',
		moved: false,
		static: true,
		isDraggable: false,
		comp: 'Gas',
	},
	{
		w: 3,
		h: 8,
		x: 0,
		y: 3,
		i: '1680690677810',
		moved: false,
		static: true,
		isDraggable: false,
		comp: 'News',
	},
	{
		w: 3,
		h: 8,
		x: 3,
		y: 3,
		i: '1680690693528',
		moved: false,
		static: true,
		isDraggable: false,
		comp: 'PieChart',
	},
	{
		w: 6,
		h: 6,
		x: 0,
		y: 11,
		i: '1680690709128',
		moved: false,
		static: true,
		isDraggable: false,
		comp: 'DataTable',
	},
	{
		w: 3,
		h: 8,
		x: 2,
		y: 17,
		i: '1680690747533',
		moved: false,
		static: true,
		isDraggable: false,
		comp: 'PieChart',
	},
];
