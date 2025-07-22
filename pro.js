import { auth, db, onAuthStateChanged, doc, onSnapshot } from "./firebase-config.js";

// DOM elements
const messageBox = document.getElementById("message");
const videoGrid = document.getElementById("proVideoGrid");

// Videos data
const videos = [
  {
    title: "Giant dildo destroyed her pussy",
    embed: "https://strtape.tech/e/1pe3Yo0pMPseqWl/"
  },
  {
    title: "She didn't lose the chance",
    embed: "https://strtape.tech/e/WrlAXXvapBIbDkx/"
  },
  {
    title: "Shemale and two beauties",
    embed: "https://strtape.tech/e/owPJoQYvYbIJawz/"
  },
  {
    title: "Two elves and one milf",
    embed: "https://strtape.tech/e/wDJrq9bxgxSoe1/"
  },
  {
    title: "Oiling the body then riding the dick",
    embed: "https://strtape.tech/e/PqGaZ0MpkMF0qAG/"
  },
];

// Clear video grid
function clearVideos() {
  while (videoGrid.firstChild) {
    videoGrid.removeChild(videoGrid.firstChild);
  }
}

// Render videos
function renderVideos() {
  clearVideos();
  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <iframe src="${video.embed}" frameborder="0" allowfullscreen></iframe>
      <h3>${video.title}</h3>
    `;
    videoGrid.appendChild(card);
  });
}

// Auth and role check with real-time Firestore listener
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "auth.html?msg=Please+login+to+view+Pro+content";
    return;
  }

  const userDocRef = doc(db, "users", user.uid);

  // Listen to role changes in real-time
  const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
    if (!docSnap.exists()) {
      messageBox.innerHTML = `<h2>🔒 Access Denied</h2><p>User data not found. Please contact support.</p>`;
      clearVideos();
      return;
    }

    const userData = docSnap.data();
    if (userData.role !== "pro") {
      messageBox.innerHTML = `<h2>🔒 Access Denied</h2><p>You must <strong>Become a Pro Member</strong> to watch these exclusive videos.</p>`;
      clearVideos();
      return;
    }

    // User is Pro
    messageBox.style.display = "none";
    renderVideos();
  });

  // Cleanup listener on page unload
  window.addEventListener("beforeunload", () => {
    unsubscribe();
  });
});

// Logout Button
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await auth.signOut();
  window.location.href = "auth.html";
});
