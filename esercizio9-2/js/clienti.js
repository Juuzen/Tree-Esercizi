const modalForm = document.forms["customerForm"];
modalForm.addEventListener("submit", addNewCustomer);

let customerList = {};

class Customer {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

function removeCustomer(email) {
  let response = confirm("Vuoi cancellare il cliente con mail " + email + "?");
  if (response) {
    let customerIndex = customerPresence(email);
    if (customerIndex != null) {
      customerList.splice(customerIndex, 1);
      window.localStorage.setItem("customer", JSON.stringify(customerList));
      redrawCustomerTable();
    }
  }
}

function handleError(name) {
  for (
    let i = 0;
    i < document.getElementsByClassName("customerModalInput").length;
    i++
  ) {
    if (
      document
        .getElementsByClassName("customerModalInput")
        [i].classList.contains("error")
    ) {
      document
        .getElementsByClassName("customerModalInput")
        [i].classList.remove("error");
    }
  }
  document.getElementById(name).classList.add("error");
}

function customerPresence(email) {
  let customerIndex = null;
  customerList.forEach((customer, index) => {
    if (customer.email === email) {
      customerIndex = index;
      return;
    }
  });
  return customerIndex;
}

function addNewCustomer(event) {
  let name = modalForm.custName.value;
  let surname = modalForm.custSurname.value;
  let email = modalForm.custMail.value;

  if (email === "" || email === undefined) {
    handleError("custMail");
    event.preventDefault();
  } else if (surname === "" || surname === undefined) {
    handleError("custSurname");
    event.preventDefault();
  } else if (name === "" || name === undefined) {
    handleError("custName");
    event.preventDefault();
  } else {
    let customerIndex = customerPresence(mail);
    if (customerIndex === null) {
      let customerObj = new Customer(
        customerList.length + 1,
        name + " " + surname,
        email
      );
      customerList.push(customerObj);
      console.log(customerList);
      window.localStorage.setItem("customer", JSON.stringify(customerList));
      redrawCustomerTable();
    } else {
      alert("Cliente già presente!");
      event.preventDefault();
    }
  }
}

function getCustomers() {
  let customer$ = fetch(SERVER_URL + USER_HTML).then((res) => res.json());
  return customer$;
}

function loadCustomers() {
  if (window.localStorage.getItem("customer") == null) {
    getCustomers().then((res) => {
      // mettere i dati nell'oggetto
      customerList = res;
      // mettere i dati nel localstorage
      window.localStorage.setItem("customer", JSON.stringify(res));
      // mostrare gli utenti (bisogna specificarlo perché siamo in maniera asincrona)
      redrawCustomerTable();
    });
  } else {
    customerList = JSON.parse(window.localStorage.getItem("customer"));
    // mostrare gli utenti
    redrawCustomerTable();
  }
}

function redrawCustomerTable() {
  let tableBody = document.getElementById("customer-table");
  let rowTable = "";
  customerList.forEach((customer) => {
    rowTable += `
    <tr>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td><button class="btn btn-sm btn-danger">Cancella</button></td>`;
  });
  tableBody.innerHTML = rowTable;
}

loadCustomers();
