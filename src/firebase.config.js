// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEPZb4bh4uOqnYhXIOtJ906Unrq79dLQg",
  authDomain: "fruits-order-app.firebaseapp.com",
  databaseURL: "https://fruits-order-app-default-rtdb.firebaseio.com",
  projectId: "fruits-order-app",
  storageBucket: "fruits-order-app.appspot.com",
  messagingSenderId: "1083183594367",
  appId: "1:1083183594367:web:0a6f6e95fe590987b8b84a",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };
