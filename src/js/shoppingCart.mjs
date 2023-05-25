import { renderWithTemplate, renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
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
  return total;
}

function displayTotalCart(cartItems) {
  const totalPrice = cartTotal(cartItems);
  let cartElement = document.querySelector(".cart-footer");

  renderWithTemplate(cartTotalTemplate, cartElement, totalPrice);
}

export default function cartList(selector, category) {
  const cartItems = getLocalStorage(category);
  const cartListElement = document.querySelector(selector);

  renderListWithTemplate(cartItemTemplate, cartListElement, cartItems, "afterbegin", true);

  displayTotalCart(cartItems);

  // get the element we will insert the list into from the selector
  // get the list of products
  // render out the product list to the element
}