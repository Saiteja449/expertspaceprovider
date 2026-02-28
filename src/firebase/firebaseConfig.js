import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 🔥 Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDJ-hkZrcBuPhIjXQ7XtCznWBVm7LIF_0',
  authDomain: 'expertspace-a9042.firebaseapp.com',
  projectId: 'expertspace-a9042',
  storageBucket: 'expertspace-a9042.firebasestorage.app',
  messagingSenderId: '888818780328',
  appId: '1:888818780328:android:d6dd1e41409ff35e8e9a9d',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


export { app };
