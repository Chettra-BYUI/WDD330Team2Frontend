import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

export default async function productDetails(productId, selector) {
  const productData = await findProductById(productId);
  renderProductDetails(productData);
  document
    .getElementById(selector)
    .addEventListener("click", () => addToCart(productData));

}

// add to cart button event handler
function addToCart(productDetail) {
  setLocalStorage("so-cart", productDetail);
  animateCartIcon();
}

// Animate cart Icon
function animateCartIcon() {
  const cartIcon = document.querySelector(".cart svg");
  
  const cartAnimationKeyframe = [
    { transform: "rotate(0) scale(1)" },
    { transform: "rotate(30deg) scale(1.4)", fill: "#008000" },
    { transform: "rotate(0deg) scale(1.4)", fill: "#008000" },
    { transform: "rotate(-30deg) scale(1.4)", fill: "#008000" },
    { transform: "rotate(0) scale(1)", fill: "none" }
  ];

  const cartAnimationOptions = {
    duration: 250,
    iterations: 2
  };

  cartIcon.animate(cartAnimationKeyframe, cartAnimationOptions);
}

// Render product details
function renderProductDetails(productDetail) {
  document.getElementById("productName").innerHTML = productDetail.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = productDetail.Name;

  document.getElementById("productImage").setAttribute("src", productDetail.Image);
  document.getElementById("productImage").setAttribute("alt", productDetail.Name);

  document.getElementById("productColorName").innerHTML = productDetail.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = productDetail.DescriptionHtmlSimple;

  document.getElementById("addToCart").setAttribute("data-id", productDetail.Id);

  // const productElement = document.querySelector(".product-detail");
  // const productNode = `
  //   <h3 id="productName">${productDetail.Brand.Name}</h3>
  //   <h2 class="divider" id="productNameWithoutBrand">${productDetail.Name}</h2>
  //   <img id="productImage" class="divider" src="${productDetail.Image}" alt="${productDetail.Name}" />
  //   <p class="product-card__price" id="productFinalPrice">${productDetail.ListPrice}</p>
  //   <p class="product__color" id="productColorName">${productDetail.Colors[0].ColorName}</p>
  //   <p class="product__description" id="productDescriptionHtmlSimple">${productDetail.DescriptionHtmlSimple}</p>
  //   <div class="product-detail__add">
  //     <button id="addToCart" data-id="${productDetail.Id}">Add to Cart</button>
  //   </div>
  // `;

  // productElement.insertAdjacentHTML("afterbegin", productNode);

}