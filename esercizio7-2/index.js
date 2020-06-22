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
  let hashedPassword = null;
  if (checkUser(email)) {
    hashedPassword = await encrypt(password);

    if (userDB[email] === hashedPassword) {
      alert("Welcome back!");
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

/*
async function login() {
  let response = false;
  let email = document.getElementById("loginMailInput").value;
  let password = document.getElementById("loginPasswordInput").value;
  let hashedPassword = null;

  // se la mail è presente
  if (!checkUser(email)) {
    alert("Indirizzo email non corretto!");
  } else {

    hashedPassword = await encrypt(password);
    // se la password coincide con quella salvata
    if (userDB[email] !== hashedPassword) {
      alert("La password non è corretta.");
    } else {
      // puoi entrare
      alert("Bentornato " + email + "!");
      window.location.href = "home.html";
    }
  }
}
*/

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
