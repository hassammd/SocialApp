// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWQnWxStGuag5G03HgbftyOGpumTPDFJc",
  authDomain: "socialapp-d493c.firebaseapp.com",
  projectId: "socialapp-d493c",
  storageBucket: "socialapp-d493c.firebasestorage.app",
  messagingSenderId: "173036120506",
  appId: "1:173036120506:web:1a688da96157a3cd209583"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)