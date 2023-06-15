import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import { formDataToJSON } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

document.querySelector("#login-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const loginFormElement = document.querySelector(".login-form");
  const formData = formDataToJSON(loginFormElement);
  const redirect = getParam("redirect");
  // console.log(formData);
  // console.log(redirect);

  login(formData, redirect);
});
