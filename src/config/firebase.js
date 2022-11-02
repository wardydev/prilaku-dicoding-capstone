import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNf-4lgTkMnITId90ynNm4RCVz1D23bkQ",
  authDomain: "fake-storeapi-auth.firebaseapp.com",
  projectId: "fake-storeapi-auth",
  storageBucket: "fake-storeapi-auth.appspot.com",
  messagingSenderId: "836825646646",
  appId: "1:836825646646:web:f3f59c69159ccf465f3a97",
  measurementId: "G-MRZ7WVWS35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, facebookProvider, googleProvider, db, storage };
