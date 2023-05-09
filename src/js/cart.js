import { getLocalStorage, getImageUrl } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    //cart functionality to get total price and display
    const totalPrice = cartTotal(cartItems);
    let totalDisplay = `${totalPrice}`;
    let cartElement = document.querySelector(".cart-total");
    cartElement.insertAdjacentHTML("beforeend", totalDisplay);

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
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

// function getImageUrl(name) {
//   return new URL(`../images/tents/${name}`, import.meta.url).href;
// }

function cartItemTemplate(item) {
  const imageUrl = getImageUrl(item.Image);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageUrl}"
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

renderCartContents();
