// ✅ Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ✅ Firebase config (your latest one)
const firebaseConfig = {
  apiKey: "AIzaSyByBVXgcW2BJR9qY2bebvRUDPm2n0rZr8g",
  authDomain: "hardcoreuser-45287.firebaseapp.com",
  projectId: "hardcoreuser-45287",
  storageBucket: "hardcoreuser-45287.firebasestorage.app",
  messagingSenderId: "1080064455870",
  appId: "1:1080064455870:web:1c78d28a21d1c0f47f5aef",
  measurementId: "G-KLSC9Q7KBR"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ DOM Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const messageBox = document.getElementById("messageBox");

// ✅ Show Message
function showMessage(msg, color = "red") {
  if (messageBox) {
    messageBox.innerText = msg;
    messageBox.style.color = color;
  }
}

// ✅ Register
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
      showMessage("Please fill both fields.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        showMessage("Registration successful ✅", "green");
        window.location.href = "pro.html"; // Or wherever you want to redirect
      })
      .catch((error) => {
        showMessage(error.message);
      });
  });
}

// ✅ Login
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
      showMessage("Please fill both fields.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showMessage("Login successful ✅", "green");
        window.location.href = "pro.html";
      })
      .catch((error) => {
        showMessage("Login failed: " + error.message);
      });
  });
}

// ✅ Check auth state on load
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("User logged out");
  }
});

// ✅ Logout (Optional: Add this in pro.html or free.html)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}
