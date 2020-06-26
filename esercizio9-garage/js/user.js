class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}

let adminUser = new User("admin@mail.it", sha512("admin"));
window.localStorage.setItem("admin", JSON.stringify(adminUser));
