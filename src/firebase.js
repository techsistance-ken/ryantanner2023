// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, getFirestore, collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUK3SWHJ0UxWkX_J9PLYCUBiaxP6Vn0QM",
    authDomain: "ryantanner2023.firebaseapp.com",
    projectId: "ryantanner2023",
    storageBucket: "ryantanner2023.appspot.com",
    messagingSenderId: "451644166240",
    appId: "1:451644166240:web:84f3a091d586689f40b305",
    measurementId: "G-51DDE04JP7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = agetAnalytics(app);
const auth = getAuth(app);
let db = getFirestore(app);

export {
    auth,
    doc,
    getDoc,
    getDocs,
    collection,
    db
}