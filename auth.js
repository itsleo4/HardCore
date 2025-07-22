let mode = "login"; // login or register
const authBtn = document.getElementById("authBtn");
const switchLink = document.getElementById("switchLink");
const statusMessage = document.getElementById("statusMessage");

switchLink.addEventListener("click", () => {
  mode = mode === "login" ? "register" : "login";
  authBtn.textContent = mode === "login" ? "Login" : "Register";
  switchLink.textContent = mode === "login" ? "Register" : "Login";
  statusMessage.textContent = "";
});

authBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    statusMessage.textContent = "Please fill all fields.";
    return;
  }

  statusMessage.textContent = "Loading...";

  try {
    if (mode === "login") {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      statusMessage.textContent = "Logged in!";
      window.location.href = "free.html";
    } else {
      const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = userCred.user.uid;
      // Set default role as "free"
      await firebase.database().ref("users/" + uid).set({ role: "free" });
      statusMessage.textContent = "Registered!";
      window.location.href = "free.html";
    }
  } catch (err) {
    statusMessage.textContent = err.message;
  }
});
