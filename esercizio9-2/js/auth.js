class Auth {
  static getCookie(cookieName) {
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

  static validate() {
    let response = false;
    let cookieValue = Auth.getCookie("loggeduser");
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

  static login() {
    if (!Auth.validate()) {
      location.href = "index.html";
    }
  }

  static logout() {
    document.cookie = "loggeduser=";
    location.href = "index.html";
  }
}

