let userDB = {}; // MAIL : PASSWORD
const LSkey = "My first crypted DB";

function storeDB() {
  window.localStorage.setItem(LSkey, JSON.stringify(userDB));
}

function loadDB() {
  if (window.localStorage.getItem(LSkey) != null) {
    userDB = JSON.parse(window.localStorage.getItem(LSkey));
  } else {
    storeDB();
  }
}


function checkUser(email) {
  return userDB[email] ? userDB[email] : false;
}

/* ------ */

async function encrypt(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function passwordCheck(password, storedPassword) {
  const hashedPassword = await encrypt(password);
  return hashedPassword === storedPassword ? true : false;
}

/* ------ */

// Per poter scrivere nel cookie
function setCookie(cookieName, cookieValue, expiryDays) {
  var d = new Date();
  d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    cookieName + "=" + JSON.stringify(cookieValue) + ";" + expires + ";path=/";
}

// Per poter recuperare il cookie dal browser
function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return "";
}

/* ------ */

async function login() {
  let email = document.getElementById("loginMailInput").value;
  let password = document.getElementById("loginPasswordInput").value;

  let hashedPassword = null;
  if (checkUser(email)) {
    hashedPassword = await encrypt(password);

    if (userDB[email] === hashedPassword) {
      let userObj = { a: email, b: hashedPassword };
      setCookie("User", userObj, 10);
      console.log(getCookie("User"));
      console.log(userDB);
      document.forms["login"].submit();
    } else {
      alert("La password non è corretta.");
      return;
    }
  } else {
    alert("Email inesistente");
    return;
  }
}

/* ------ */

async function register() {
  let email = document.getElementById("registerMailInput").value;
  let password = document.getElementById("registerPasswordInput").value;
  let psConfirm = document.getElementById("registerPasswordConfirm").value;

  // controllo se è già presente un utente con la stessa mail
  if (checkUser(email)) {
    alert("Utente già presente!");
    return false;
  }

  // controllo se le password coincidono
  if (password !== psConfirm) {
    alert("Le password non coincidono!");
    return false;
  }

  // posso salvare l'utente
  userDB[email] = await encrypt(password);
  storeDB();
  alert("Utente memorizzato!");
}

/* ------ */

window.onload = () => {
  loadDB();
};
