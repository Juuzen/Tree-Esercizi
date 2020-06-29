/* Site */
const SITE_URL = window.location.href;
const SITE_PAGE = SITE_URL.substring(SITE_URL.lastIndexOf("/") + 1);

window.onload = () => {
  Auth.login();
  var CUSTOMER = new Customer();
  CUSTOMER.loadCustomers();
};
