var toggle = true;

function toggleDivs() {
  toggle = !toggle;
  if (toggle) {
    showLogin();
  } else {
    showRegister();
  }
}

function showLogin() {
  let login = document.getElementById("loginFormDiv");
  let register = document.getElementById("registerFormDiv");
  login.style.display = "";
  register.style.display = "none";
}

function showRegister() {
  let login = document.getElementById("loginFormDiv");
  let register = document.getElementById("registerFormDiv");
  login.style.display = "none";
  register.style.display = "";
}

function hideMyself() {
  console.log("Ma ci entro qui?");
  document.getElementById("registerFormDiv").style.display = "none";
}

/* --- */

function validateEmpty() {
  let alertMessage = "";
  let registerFormValues = document
    .getElementById("registerFormDiv")
    .getElementsByTagName("input");
  for (input of registerFormValues) {
    switch (input.title) {
      case "":
        break;
      default:
        if (input.value == "") {
          alertMessage += "Il campo " + input.title + " è mancante.\n";
        }
    }
  }

  return alertMessage;
}

function getRegisterInfo() {
  let userName = document.getElementById("registerNameInput");
  let userSurname = document.getElementById("registerSurnameInput");
  let userMail = document.getElementById("registerEmailInput");
  let userPassword = document.getElementById("registerPasswordInput");
  let userPasswordConfirm = document.getElementById("registerPasswordConfirm");

  // check se i campi sono vuoti
  let emptyMessage = validateEmpty();
  if (emptyMessage !== "") {
    alert(emptyMessage);
  } else {
    // check sulla mail
    // check sulla correttezza della password
    if (userPassword.value !== userPasswordConfirm.value) {
      alert("Le password non corrispondono!");
    } else {
      alert("Le password corrispondono!");
    }
  }
}

/* --- */

window.onload = () => {};
