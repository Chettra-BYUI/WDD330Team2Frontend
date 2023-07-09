// import productList from "./productList.mjs";
import { loadHeaderFooter, renderWithTemplate } from "./utils.mjs";
import Alert from "./alert.js";
// import { checkLogin } from "./auth.mjs";

loadHeaderFooter();

// productList(".product-list", "tents");

const alert = new Alert();
alert.renderAlert();

// check if user is logged in
// checkLogin();

const isFirstTimeVisitor = !localStorage.getItem("so-visit");
if (isFirstTimeVisitor) {
  localStorage.setItem("so-visit", "visited");
  const registerWithSiteBannerTemplate = () => {
    const template =
      "<p class='visit-banner'>Register to win a 50% OFF gift card</p>";
    return template;
  };

  const bodyElement = document.querySelector("body");

  renderWithTemplate(
    registerWithSiteBannerTemplate,
    bodyElement,
    undefined,
    undefined,
    undefined,
    false
  );
}
