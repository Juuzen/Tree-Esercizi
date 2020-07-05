/* Site */
const SITE_URL = window.location.href;
const SITE_PAGE = SITE_URL.substring(SITE_URL.lastIndexOf("/") + 1);

window.onload = () => {
  Auth.login();
  switch (SITE_PAGE) {
    case "clienti.html":
      loadCustomers();
      break;
    case "garage.html":
      loadGarage2();
      break;
    default:
    // code block
  }
};
