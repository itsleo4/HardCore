// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// ✅ Firebase Config
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

// ✅ Register Logic
document.getElementById("registerBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    alert("✅ Registered! Check your email to verify before logging in.");
  } catch (error) {
    alert("❌ Registration Failed: " + error.message);
  }
});

// ✅ Login Logic
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      alert("❌ Please verify your email before logging in.");
      return;
    }

    // ✅ Assume role manually for now: default = Free, admin manually upgrades in backend
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", "Free"); // For real Pro check, use Firestore or manual

    alert("✅ Login successful!");
    window.location.href = "pro.html";
  } catch (error) {
    alert("❌ Login Failed: " + error.message);
  }
});

// ✅ Logout Button (if any)
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await signOut(auth);
  localStorage.clear();
  window.location.href = "index.html";
});
