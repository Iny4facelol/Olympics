// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq-kXejvCfoYFBY7TU-0S4zoO_biFoOfE",
  authDomain: "olympics-8a544.firebaseapp.com",
  projectId: "olympics-8a544",
  storageBucket: "olympics-8a544.firebasestorage.app",
  messagingSenderId: "608531767051",
  appId: "1:608531767051:web:098a68973cfa8e00ba0c0e",
  measurementId: "G-T8273B19Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;