// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3X8eTVcVB1w-vPjGbTnltR524maPVzCA",
  authDomain: "banco-de-cadastro-af5e8.firebaseapp.com",
  projectId: "banco-de-cadastro-af5e8",
  storageBucket: "banco-de-cadastro-af5e8.appspot.com",
  messagingSenderId: "121013910034",
  appId: "1:121013910034:web:36a8830be777c045bfb6cb"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db