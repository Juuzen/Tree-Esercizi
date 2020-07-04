const SERVER_URL = "https://jsonplaceholder.typicode.com";
const USER_URL = "/users";

const LS = window.localStorage;
const modalForm = document.forms["customerForm"];
var customerList = [];

fetchCustomers = () => {
  let cust_$ = fetch(SERVER_URL + USER_URL).then((res) => res.json());
  return cust_$;
};

refreshCustomerIds = () => {
  customerList.forEach((customer, index) => (customer.id = index + 1));
};

removeCustomer = (name, id) => {
  let response = confirm("Vuoi davvero cancellare l'utente " + name + "?");
  if (response) {
    customerList = customerList.filter((customer) => customer.id !== id);
    refreshCustomerIds();
    saveCustomers();
  }
};

redrawCustomerTable = () => {
  let tableBody = document.getElementById("customer-table");
  tableBody.innerHTML = "";
  customerList.forEach((customer) => {
    tableBody.innerHTML += `
    <tr class="text-center">
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td><button class="btn btn-sm btn-danger" id="delete-customer-${customer.id}" onClick="removeCustomer('${customer.name}', ${customer.id});"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
    </tr>`;
  });
};

loadCustomers = async () => {
  modalForm.addEventListener("submit", addCustomer);
  if (LS.getItem("customer") === null) {
    /* Fetch the customers from the placeholder */
    customerList = await fetchCustomers().then((customers) => {
      /* Now we have customers, we have to polish the array */
      return customers.map((customer) => {
        var customerObj = {};
        customerObj["id"] = customer.id;
        customerObj["name"] = customer.name;
        customerObj["email"] = customer.email;
        customerObj["rentCar"] = "";
        customerObj["rentDate"] = "";
        return customerObj;
      });
    });
    saveCustomers();
  } else {
    customerList = JSON.parse(LS.getItem("customer"));
    redrawCustomerTable();
  }
};

saveCustomers = () => {
  LS.setItem("customer", JSON.stringify(customerList));
  redrawCustomerTable();
};

isPresent = (custMail) => {
  let response = null;
  customerList.forEach((customer, index) => {
    if (customer.email === custMail) {
      response = index;
      return;
    }
  });
  return response;
};

addCustomer = (event) => {
  let name = modalForm.custName.value;
  let surname = modalForm.custSurname.value;
  let email = modalForm.custMail.value;
  if (name == "" || surname == "" || email == "") {
    alert("Inserire tutti i dati!");
    event.preventDefault();
  } else {
    if (isPresent(email) === null) {
      let customer = {
        id: customerList.length + 1,
        name: name + " " + surname,
        email: email,
        rentCar: "",
        rentDate: "",
      };
      customerList.push(customer);
      saveCustomers();
    } else {
      alert("Questo cliente è già presente!");
      event.preventDefault();
    }
  }
};
