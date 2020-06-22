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

/* ------ */

function login() {
  let email = document.getElementById("loginMailInput").value;
  let password = document.getElementById("loginPasswordInput").value;
  console.log(email);
  if (!checkUser(email)) {
    alert("Indirizzo email non corretto!");
    return false;
  }

  if (password !== userDB[email]) {
    alert("La password non è corretta!");
    return false;
  }

  alert("Bentornato " + email + "!");
  return true;
}

/* ------ */

function checkUser(email) {
  return userDB[email] ? userDB[email] : false;
}

function register() {
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
  userDB[email] = password; //questa password deve essere crittata
  storeDB();
  alert("Utente memorizzato!");
}

/* ------ */

window.onload = () => {
  loadDB();
};
