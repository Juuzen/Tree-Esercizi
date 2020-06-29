const form = document.forms["loginForm"];
const adminUsr = JSON.parse(window.localStorage.getItem("admin"));
const mailDB = adminUsr.email;
const passDB = adminUsr.password;

function setCookie(cookieName, cookieValue, expiryDays) {
  var d = new Date();
  d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function formSubmit(event) {
  if (form.email.value == "" || form.email.value == undefined) {
    alert("Mail non valida!");
    event.preventDefault();
  } else if (form.password.value == "" || form.email.value == undefined) {
    alert("Password non corretta!");
    event.preventDefault();
  } else {
    if (form.email.value === mailDB && sha512(form.password.value) === passDB) {
      setCookie("loggeduser", passDB, 10);
    } else {
      alert("Dati non corretti.");
      event.preventDefault();
    }
  }
}

window.onload = function () {
  form.addEventListener("submit", formSubmit);
};
