// auth.js
import { auth, onAuthStateChanged } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

    // Remove localStorage role setting here; role will be managed real-time
    localStorage.setItem("userEmail", email);

    alert("✅ Login successful!");
    // Redirect will be handled by onAuthStateChanged listener
  } catch (error) {
    alert("❌ Login Failed: " + error.message);
  }
});

// Global onAuthStateChanged listener to manage auth state and redirect
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (!user.emailVerified) {
      alert("❌ Please verify your email before logging in.");
      signOut(auth);
      return;
    }
    // Redirect logged-in users to pro.html
    if (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("register.html") || window.location.pathname.endsWith("index.html")) {
      window.location.href = "pro.html";
    }
  } else {
    // Redirect logged-out users to login.html if not already there
    if (!window.location.pathname.endsWith("login.html") && !window.location.pathname.endsWith("register.html") && !window.location.pathname.endsWith("index.html")) {
      window.location.href = "login.html";
    }
  }
});

// ✅ Logout Button (if any)
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await signOut(auth);
  localStorage.clear();
  window.location.href = "index.html";
});
