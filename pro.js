// pro.js

// Firebase is initialized via firebase-config.js

firebase.auth().onAuthStateChanged(async (user) => {
  const messageBox = document.getElementById("message");
  const videoGrid = document.getElementById("proVideoGrid");

  if (!user) {
    window.location.href = "auth.html?msg=Please+login+to+view+Pro+content";
    return;
  }

  const userId = user.uid;
  const dbRef = firebase.database().ref("users/" + userId + "/role");
  const roleSnap = await dbRef.get();
  const role = roleSnap.val();

  if (role !== "pro") {
    messageBox.innerHTML = `<h2>🔒 Access Denied</h2><p>You must <strong>Become a Pro Member</strong> to watch these exclusive videos.</p>`;
    return;
  }

  // If user is Pro, show videos
  messageBox.style.display = "none";

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

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <iframe src="${video.embed}" frameborder="0" allowfullscreen></iframe>
      <h3>${video.title}</h3>
    `;
    videoGrid.appendChild(card);
  });
});

// Logout Button
document.getElementById("logoutBtn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "auth.html";
  });
});
