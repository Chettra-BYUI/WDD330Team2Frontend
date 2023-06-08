import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

export default async function productDetails(productId, selector) {
  const productData = await findProductById(productId, "tents");
  if (productData) {
    renderProductDetails(productData);
    document
      .getElementById(selector)
      .addEventListener("click", () => addToCart(productData));
  } else {
    //Product not found page
    //Used only when product id is not found.
    showNotFoundPage();
  }
}

// add to cart button event handler
function addToCart(productDetail) {
  let cart = getLocalStorage("so-cart");
  
  if (cart) {
    // if cart is not empty 
    let duplicate = false;

    for (let i = 0; i < cart.length; i++) {
  
      if (cart[i].Id === productDetail.Id) {
        // checks for duplicate items and if there is it adds to cart quantity.  
        // also sets local storage items again but with quantity changed. 
        // note: we are not adding a new cart item but just changing the quantity variable. 
        duplicate = true;
        cart[i].Quantity += 1;
        localStorage.setItem("so-cart", JSON.stringify(cart));
      }
    }
    if (duplicate === false) {
      // if no exisiting item, it adds it to cart.
      // also quantity is created here and initialized with 1. 
      productDetail.Quantity = 1;
      setLocalStorage("so-cart", productDetail);
    }
  } else {
    // just for in case the cart is empty 
    // we add an item and initialize it with quantity of 1. 
    productDetail.Quantity = 1;
    setLocalStorage("so-cart", productDetail);
  }

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
    iterations: 2,
  };

  cartIcon.animate(cartAnimationKeyframe, cartAnimationOptions);
}

// Render product details
function renderProductDetails(productDetail) {
  document.getElementById("productName").innerHTML = productDetail.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerHTML =
    productDetail.Name;

  document
    .getElementById("productImage")
    .setAttribute("src", productDetail.Images.PrimaryLarge);
  document
    .getElementById("productImage")
    .setAttribute("alt", productDetail.Name);

  document.getElementById("productColorName").innerHTML =
    productDetail.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    productDetail.DescriptionHtmlSimple;

  document
    .getElementById("addToCart")
    .setAttribute("data-id", productDetail.Id);

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

function showNotFoundPage() {
  document.getElementById("addToCart").remove();
  const productDetail = document.querySelector(".product-detail");
  productDetail.innerHTML = "";

  const status = document.createElement("h1");
  const title = document.createElement("p");

  status.innerHTML = "404";
  title.innerHTML = "Uh-Oh... Sorry your product is not found";

  productDetail.classList.add("product-not-found");
  productDetail.innerHTML += status.outerHTML + title.outerHTML;
}
