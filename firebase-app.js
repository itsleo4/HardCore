// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByBVXgcW2BJR9qY2bebvRUDPm2n0rZr8g",
  authDomain: "hardcoreuser-45287.firebaseapp.com",
  projectId: "hardcoreuser-45287",
  storageBucket: "hardcoreuser-45287.firebasestorage.app",
  messagingSenderId: "1080064455870",
  appId: "1:1080064455870:web:1c78d28a21d1c0f47f5aef",
  measurementId: "G-KLSC9Q7KBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
