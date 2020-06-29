const SERVER_URL = "https://jsonplaceholder.typicode.com";
const USER_URL = "/users";

const modalForm = document.forms["customerForm"];

class Customer {
  constructor() {
    this.customers = null;
  }

  test = () => {
    alert("ciao");
  };

  redrawCustomerTable = () => {
    let tableBody = document.getElementById("customer-table");
    tableBody.innerHTML = "";
    this.customers.forEach((customer) => {
      let name = customer.name;
      let id = customer.id;

      tableBody.innerHTML += `
      <tr class="text-center">
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.rentDate}</td>
        <td>${customer.rentCar}</td>
        <td><button class="btn btn-sm btn-secondary text-center"><i class="fas fa-arrow-left"></i></button></td>
        <td><button class="btn btn-sm btn-danger" id="delete-customer-${customer.id}" onClick="CUSTOMER.removeCustomer("${customer.name}", ${customer.id});"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
      </tr>`;
    });
  };

  fetchCustomers = () => {
    let cust_$ = fetch(SERVER_URL + USER_URL).then((res) => res.json());
    return cust_$;
  };

  loadCustomers = async () => {
    modalForm.addEventListener("submit", this.addCustomer);
    if (window.localStorage.getItem("customer") === null) {
      /* Fetch the customers from the placeholder */
      this.customers = await this.fetchCustomers().then((customers) => {
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
      this.saveCustomers();
    } else {
      this.customers = JSON.parse(window.localStorage.getItem("customer"));
      this.redrawCustomerTable();
    }
  };

  saveCustomers = () => {
    window.localStorage.setItem("customer", JSON.stringify(this.customers));
    this.redrawCustomerTable();
  };

  isPresent = (custMail) => {
    let response = null;
    this.customers.forEach((customer, index) => {
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
      if (this.isPresent(email) === null) {
        let customer = {
          id: this.customers.length + 1,
          name: name + " " + surname,
          email: email,
          rentCar: "",
          rentDate: "",
        };
        this.customers.push(customer);
        this.saveCustomers();
      } else {
        alert("Questo cliente è già presente!");
        event.preventDefault();
      }
    }
  };

  removeCustomer = (name, id) => {
    let response = confirm("Vuoi davvero cancellare l'utente " + name + "?");
    if (response) {
      this.customers = this.customers.filter((customer) => customer.id !== id);
      this.saveCustomers();
    }
  };
}
