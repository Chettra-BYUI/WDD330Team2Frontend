import checkoutProcess from "./checkoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

checkoutProcess.init("so-cart", document.getElementById("checkoutSummary"));
document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();
  await checkoutProcess.checkout(e.target);
});

loadHeaderFooter();
