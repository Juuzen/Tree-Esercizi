const form = document.forms["loginForm"];
const adminUsr = JSON.parse(window.localStorage.getItem("admin"));
const mailDB = adminUsr.email;
const passDB = adminUsr.password;

function formSubmit(event) {
  
  if (form.email.value == "" || form.email.value == undefined) {
    alert("Mail non valida!");
    event.preventDefault();
  } else if (form.password.value == "" || form.email.value == undefined) {
    alert("Password non corretta!");
    event.preventDefault();
  } else {
    if (form.email.value === mailDB && sha512(form.password.value) === passDB) {
      console.log("dashboard");
      //form.submit();
    } else {
      alert("Dati non corretti.");
      event.preventDefault();
    }
  }
}

window.onload = function () {
  form.addEventListener("submit", formSubmit);
};
