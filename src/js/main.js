import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

loadHeaderFooter();

productList(".product-list", "tents");

const alert = new Alert();
alert.renderAlert();
