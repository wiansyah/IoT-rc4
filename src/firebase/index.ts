// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBudsWK9BzPwbKHYMHvWw-lCyOqVyRbVdQ",
    authDomain: "enc-rc4.firebaseapp.com",
    projectId: "enc-rc4",
    storageBucket: "enc-rc4.appspot.com",
    messagingSenderId: "178777703445",
    databaseURL: "https://enc-rc4-default-rtdb.firebaseio.com/",
    appId: "1:178777703445:web:df1d359ca5a04076993a1c",
    measurementId: "G-0LBJMKV20T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database }