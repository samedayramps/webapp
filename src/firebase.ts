// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCby3a7kd24YroYqdiegewNP1t2y1hcXa4",
    authDomain: "sdr-webapp.firebaseapp.com",
    projectId: "sdr-webapp",
    storageBucket: "sdr-webapp.appspot.com",
    messagingSenderId: "92536536415",
    appId: "1:92536536415:web:d3be3f6650af4cb1768aea"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();