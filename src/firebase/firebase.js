// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "showga-blog.firebaseapp.com",
  projectId: "showga-blog",
  storageBucket: "showga-blog.appspot.com",
  messagingSenderId: "922693999521",
  appId: "1:922693999521:web:fcd0d4934472b442eb49e0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
