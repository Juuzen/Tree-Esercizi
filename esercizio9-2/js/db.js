/* JSON Placeholder */
const SERVER_URL = "https://jsonplaceholder.typicode.com";
const USER_URL = "/users";

/* Vehicle API */
const BRANDURL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";
const VEHICLEURL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/";
const VEHICLEURLSUFFIX = "?format=json";

class DB {
  constructor() {
    this.customers = null;
    this.cars = null;
  }

  /* Customers */

  fetchCustomers() {
    let cust_$ = fetch(SERVER_URL + USER_URL).then((res) => res.json());
    return cust_$;
  }

  async getCustomers() {
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

    /*
    if (window.localStorage.getItem("customer") === null) {
    } else {
      //this.customers = JSON.parse(window.localStorage.getItem("customer"));
    }*/
  }

  saveCustomers() {
    window.localStorage.setItem("customer", JSON.stringify(this.customers));
  }

  /* Cars */
}
