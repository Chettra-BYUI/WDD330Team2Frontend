import { checkLogin } from "./auth.mjs";
import { currentOrders } from "./currentOrders.mjs";
import { loadHeaderFooter, renderBreadcrumb } from "./utils.mjs";

loadHeaderFooter();

const token = checkLogin();
currentOrders("#orders", token);

// renderBreadcrumb
renderBreadcrumb();
