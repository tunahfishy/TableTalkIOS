// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxtx5Bf8oiNkEvTIXnYZWsRlEwrKmEYvE",
  authDomain: "table-talk-ios.firebaseapp.com",
  projectId: "table-talk-ios",
  storageBucket: "table-talk-ios.appspot.com",
  messagingSenderId: "638332712639",
  appId: "1:638332712639:web:a7475605d05830a78bb80a",
  measurementId: "G-CPFSD7TLKQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
