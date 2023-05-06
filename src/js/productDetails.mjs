import { setLocalStorage, getImageUrl } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let productData;

export default async function productDetails(productId) {
  productData = await findProductById(productId);
  renderProductDetails(productData);
}

// add to cart button event handler
function addToCartHandler() {
  addProductToCart(productData);
}

function addProductToCart(productDetail) {
  setLocalStorage("so-cart", productDetail);
}

function renderProductDetails(productDetail) {
  const imageUrl = getImageUrl(productDetail.Image)
  const productElement = document.querySelector(".product-detail");
  const productNode = `
    <h3 id="productName">${productDetail.Brand.Name}</h3>
    <h2 class="divider" id="productNameWithoutBrand">${productDetail.Name}</h2>
    <img id="productImage" class="divider" src="${imageUrl}" alt="${productDetail.Name}" />
    <p class="product-card__price" id="productFinalPrice">${productDetail.ListPrice}</p>
    <p class="product__color" id="productColorName">${productDetail.Colors[0].ColorName}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">${productDetail.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="">Add to Cart</button>
    </div>
  `;

  productElement.insertAdjacentHTML("afterbegin", productNode);

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler(productDetail));

}