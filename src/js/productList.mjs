import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let RS_Price = product.SuggestedRetailPrice;
  let formattedRSP = RS_Price.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
      srcset="${product.Images.PrimarySmall} 80w, ${product.Images.PrimaryMedium} 160w, ${product.Images.PrimaryLarge} 320w, ${product.Images.PrimaryExtraLarge} 600w"
      sizes="(max-width: 400px) 80px, (max-width: 576px) 160px, (max-width: 1280px) 320px, 600px"
      src="${product.Images.PrimaryLarge}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
    <p class="product-card__price_SRP">${formattedRSP}</p></a>
  </li>`;
}

// function renderList(products, productListElement) {
//   const htmlStrings = products.map((product) => productCardTemplate(product));

//   productListElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
// }
function filterProducts(numbers, products) { 
  return products.filter(( product, index ) => index < numbers );
}

// sorting product list function by name
function sortProductsByName(products) {
  const sortedProducts = products.sort((a, b) => {
    const productA = a.NameWithoutBrand.toLowerCase();
    const productB = b.NameWithoutBrand.toLowerCase();

    if (productA < productB) return -1;
    if (productA > productB) return 1;
    return 0;
  });
  return sortedProducts;
}

// sorting product list function by price
function sortProductsByPrice(products) {
  const sortedProducts = products.sort((a, b) => a.ListPrice - b.ListPrice);
  return sortedProducts; 
}

// sorting product list function
function sortProductList(products, sortingType = "name") {
  if (sortingType === "name") return sortProductsByName(products);
  if (sortingType === "price") return sortProductsByPrice(products);
}

// fetching and rendering product list
export default async function productList(selector, category) {
  const products = await getProductsByCategory(category);
  const filteredProducts = filterProducts(14, products);
  const productListElement = document.querySelector(selector);
  const sortProductListElement = document.querySelector("#sort-products");


  renderListWithTemplate(productCardTemplate, productListElement, filteredProducts, "afterbegin", true);

  // sorting function list
  sortProductListElement.addEventListener("change", event => {
    const sortedProductList = sortProductList(filteredProducts, event.target.value);

    renderListWithTemplate(productCardTemplate, productListElement, sortedProductList, "afterbegin", true);
  });

  // get the element we will insert the list into from the selector
  // get the list of products
  // render out the product list to the element
}
