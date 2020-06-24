window.onload = () => {
  let cookie = getCookie("User");
  // non so perché faccia così
  let userDB = JSON.parse(window.localStorage.getItem(LSkey));
  if (cookie !== "" && userDB[cookie.a] === cookie.b) {
    loginSuccess(cookie.a);
  } else {
    alert("Non sei registrato! Verrai riportato nella home...");
    window.location.href = "index.html";
  }
};

function loginSuccess(user) {
  let container = document.querySelector(".success-page");
  let audioDiv = document.createElement("audio");

  audioDiv.setAttribute("autoplay", true);
  audioDiv.setAttribute("src", "assets/fanfare.mp3");
  container.appendChild(audioDiv);

  let containerDiv = document.createElement("div");
  containerDiv.classList.add(
    "container-fluid",
    "d-flex",
    "justify-content-center",
    "screen"
  );
  container.appendChild(containerDiv);

  let textSpan = document.createElement("span");
  textSpan.classList.add("align-self-stretch", "success-text");
  textSpan.textContent = "BENVENUTO " + user + "!!!";
  containerDiv.appendChild(textSpan);
}
