import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: 'AIzaSyABVMHOpCJObGa_9ON-noXJ703eyQMY2hY',
 authDomain: 'real-property-poc.firebaseapp.com',
 projectId: 'real-property-poc',
 storageBucket: 'real-property-poc.appspot.com',
 messagingSenderId: '441291101964',
 appId: '1:441291101964:ios:41f2e903baea08c6b7db29',
 measurementId: 'G-R0LSXFMTPX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };
