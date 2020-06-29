/* Costanti */

const SERVER_URL = "http://localhost:3000";
const USER_HTML = "/users";

const BRANDURL = "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";

/* Controllo del login */

function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function validateLogin() {
  let response = false;
  let cookieValue = getCookie("loggeduser");
  if (cookieValue == "" || cookieValue == undefined) {
  } else {
    let userDB = JSON.parse(window.localStorage.getItem("admin"));
    if (cookieValue === userDB.password) {
      document.getElementsByClassName("loader")[0].classList.add("hidden");
      response = true;
    }
  }

  return response;
}

function logout() {
  document.cookie = "loggeduser=";
  location.href = "index.html";
}

window.onload = function () {
  if (!validateLogin()) {
    location.href = "index.html";
  }
};
