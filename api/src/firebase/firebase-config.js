// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ScHCzwR-A06gR1eoj5qsWcK_mDySIWg",
  authDomain: "intranet-0.firebaseapp.com",
  projectId: "intranet-0",
  storageBucket: "intranet-0.appspot.com",
  messagingSenderId: "920830860150",
  appId: "1:920830860150:web:4a71b8b4a2deafcf357857",
  measurementId: "G-WYCJ8SJ131",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
