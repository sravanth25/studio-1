// Import the functions you need from the SDKs you need
import {initializeApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'studio-6984939742-62794',
  appId: '1:305667962919:web:b06b5945e540ce2dc0f602',
  storageBucket: 'studio-6984939742-62794.firebasestorage.app',
  apiKey: 'AIzaSyBeGKKXTC0WwgtcCeniZGkAoZvWhhM5_k0',
  authDomain: 'studio-6984939742-62794.firebaseapp.com',
  measurementId: 'G-D3B34J200X',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export {db};
