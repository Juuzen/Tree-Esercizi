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

async function login() {
  let email = document.getElementById("loginMailInput").value;
  let password = document.getElementById("loginPasswordInput").value;
  if (!checkUser(email)) {
    alert("Indirizzo email non corretto!");
    return;
  }

  if ((await passwordCheck(password, userDB[email])) === false) {
    alert("La password non è corretta.");
    return;
  }

  alert("Bentornato " + email + "!");
  return true;
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
