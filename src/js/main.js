// import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";
// import { checkLogin } from "./auth.mjs";

loadHeaderFooter();

// productList(".product-list", "tents");

const alert = new Alert();
alert.renderAlert();

// check if user is logged in
// checkLogin();
