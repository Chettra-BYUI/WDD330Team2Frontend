import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let productData;

export default async function productDetails(productId, selector) {
  productData = await findProductById(productId);
  renderProductDetails(productData);
  document
    .getElementById(selector)
    .addEventListener("click", addToCartHandler);

}

// add to cart button event handler
function addToCartHandler() {
  addProductToCart(productData);
}

function addProductToCart(productDetail) {
  setLocalStorage("so-cart", productDetail);
}

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