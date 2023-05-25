import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();

const searchedCategory = getParam("category");
productList(".product-list", searchedCategory);
