// Firebase setup (REQUIRED)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// DOM Elements
const userStatus = document.getElementById('userStatus');
const logoutBtn = document.getElementById('logoutBtn');
const loginBtn = document.getElementById('loginBtn');
const banner = document.getElementById('guestBanner');
const videoGrid = document.getElementById('videoGrid');

// Detect Login State
onAuthStateChanged(auth, (user) => {
  if (user) {
    userStatus.innerText = `Welcome, ${user.email}`;
    logoutBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
    banner.style.display = 'none';
  } else {
    userStatus.innerText = `Guest`;
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    banner.style.display = 'block';
  }
});

// Buttons
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('Logged out');
    location.reload();
  });
});
loginBtn.addEventListener('click', () => {
  window.location.href = "/login.html";
});

// Sample videos
const videos = [
  {
    title: "Busty Babe Pleases Herself",
    preview: "https://i.gifer.com/7VE.gif",
    link: "https://strtape.tech/e/1pe3Yo0pMPseqWl/"
  },
  {
    title: "She Rides Like a Queen",
    preview: "https://i.gifer.com/ERa.gif",
    link: "https://strtape.tech/e/WrlAXXvapBIbDkx/"
  },
  {
    title: "Elf Girl's Wild Ride",
    preview: "https://i.gifer.com/Jd2.gif",
    link: "https://strtape.tech/e/wDJrq9bxgxSoe1/"
  },
];

// Render video cards
videos.forEach((vid) => {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.innerHTML = `
    <a href="${vid.link}" target="_blank">
      <img src="${vid.preview}" alt="${vid.title}" />
      <h3>${vid.title}</h3>
    </a>
    <div class="meta">
      <span>❤️ ${Math.floor(1000 + Math.random() * 5000)}</span>
      <span>👁️ ${Math.floor(2000 + Math.random() * 8000)}</span>
    </div>
  `;
  videoGrid.appendChild(card);
});
