// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFO02CiRSPD7O2jykk1h12PC3U0a54ekQ",
    authDomain: "mcsd61project-fad05.firebaseapp.com",
    projectId: "mcsd61project-fad05",
    storageBucket: "mcsd61project-fad05.appspot.com",
    messagingSenderId: "964846008061",
    appId: "1:964846008061:web:d502cbd11884924d20b094"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };