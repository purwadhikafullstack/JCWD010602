// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,FacebookAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdFQ3PBn66WdLE1uIqfL9QPD6L6HSxT1M",
  authDomain: "property-rent-e5920.firebaseapp.com",
  projectId: "property-rent-e5920",
  storageBucket: "property-rent-e5920.appspot.com",
  messagingSenderId: "190476685422",
  appId: "1:190476685422:web:b888c7964bdf65145b567f"
};

initializeApp(firebaseConfig);

export const auth = getAuth()
export const facebook = new FacebookAuthProvider()