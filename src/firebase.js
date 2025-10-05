import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAUj9w89BSmzO7QIlU5w6fFzB-_FR_tktw",
  authDomain: "women-safest-route.firebaseapp.com",
  databaseURL: "https://women-safest-route-default-rtdb.firebaseio.com",
  projectId: "women-safest-route",
  storageBucket: "women-safest-route.firebasestorage.app",
  messagingSenderId: "900494947297",
  appId: "1:900494947297:web:f832c14cf960069efd58a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
