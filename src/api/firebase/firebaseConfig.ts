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
