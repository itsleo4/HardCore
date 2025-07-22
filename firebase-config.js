// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByBVXgcW2BJR9qY2bebvRUDPm2n0rZr8g",
  authDomain: "hardcoreuser-45287.firebaseapp.com",
  projectId: "hardcoreuser-45287",
  storageBucket: "hardcoreuser-45287.appspot.com",
  messagingSenderId: "1080064455870",
  appId: "1:1080064455870:web:1c78d28a21d1c0f47f5aef",
  measurementId: "G-KLSC9Q7KBR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, onAuthStateChanged, doc, onSnapshot };
