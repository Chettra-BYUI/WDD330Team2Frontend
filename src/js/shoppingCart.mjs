import {
  renderWithTemplate,
  renderListWithTemplate,
  getLocalStorage,
  currencyConverter,
} from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    qty: 
    <input class="cart-card__quantity" min="1" type="number" value="${item.Quantity}">
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class=cart-card__icon  data-id=${item.Id}>x</span>
  </li>`;

  return newItem;
}

function cartTotalTemplate(total) {
  return `<p class="cart-total">Total: ${total}</p>`;
}

function cartTotal(cartItems) {
  let total = 0;
  if (cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.add("show");
    cartItems.forEach((cartItem) => {
      total += cartItem.FinalPrice;
    });
  }
  return currencyConverter(total);
}

function displayTotalCart(cartItems) {
  const totalPrice = cartTotal(cartItems);
  let cartElement = document.querySelector(".cart-footer");

  renderWithTemplate(cartTotalTemplate, cartElement, totalPrice);
}

function addPriceByQuantity(cartItems) {
  cartItems.forEach((item) => {
    item.FinalPrice = item.FinalPrice * item.Quantity;
  });
}

export default function cartList(selector, category) {
  const cartListElement = document.querySelector(selector);
  const cartItems = getLocalStorage(category);

  if (!cartItems) return;

  addPriceByQuantity(cartItems);

  renderListWithTemplate(
    cartItemTemplate,
    cartListElement,
    cartItems,
    "afterbegin",
    true
  );

  displayTotalCart(cartItems);

  // ability to remove cart by id only
  let cardIcon = document.querySelectorAll(".cart-card__icon");

  cardIcon.forEach((item) => {
    item.addEventListener("click", (e) => {
      let soCart = localStorage.getItem("so-cart");
      let cartItems = JSON.parse(soCart);

      //get id from x
      const id = e.target.getAttribute("data-id");

      //filters out id that matches clicked target
      let newItems = cartItems.filter((item) => {
        return item.Id !== id;
      });

      //if you want to remove by index and not all of them by id use this:
      // let index = [].indexOf.call(cardIcon, e.target);
      // cartItems.splice(index, 1);

      localStorage.setItem("so-cart", JSON.stringify(newItems));

      //refresh page
      location.replace(location.href);
    });
  });

  // get the element we will insert the list into from the selector
  // get the list of products
  // render out the product list to the element
}
