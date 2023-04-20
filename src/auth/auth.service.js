// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCb_JDmxcyHkEzv60Bi0qRr-di-8hnITCY",
  authDomain: "adweb-1cfdf.firebaseapp.com",
  projectId: "adweb-1cfdf",
  storageBucket: "adweb-1cfdf.appspot.com",
  messagingSenderId: "973629157370",
  appId: "1:973629157370:web:622b7ce4ba5cebdeabbe43"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {
    auth
};