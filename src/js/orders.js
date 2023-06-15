import { checkLogin } from "./auth.mjs";
import { currentOrders } from "./currentOrders.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const token = checkLogin();
currentOrders(token);
