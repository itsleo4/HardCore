function submitPayment(method) {
  const username = document.getElementById("usernameInput").value;

  if (!username) {
    alert("Please enter your username before submitting payment.");
    return;
  }

  fetch("https://63ce8a1b-d60e-45e9-8ace-db508feff835-00-nnnhmd8hxoz6.worf.replit.dev/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      method: method
    })
  })
  .then(response => response.text())
  .then(data => {
    alert("Payment info sent! We'll approve you soon.");
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Something went wrong.");
  });
}
