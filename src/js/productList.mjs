import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`;
}

// function renderList(products, productListElement) {
//   const htmlStrings = products.map((product) => productCardTemplate(product));

//   productListElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
// }
function filterProducts(numbers, products) { 
    return products.filter(( product, index ) => index < numbers )
}

export default async function productList(selector, category) {
  const products = await getData(category);
  const filteredProducts = filterProducts(4, products)
  const productListElement = document.querySelector(selector);


//   renderList(products, productListElement);


  renderListWithTemplate(productCardTemplate, productListElement, filteredProducts, "afterbegin", true);

  // get the element we will insert the list into from the selector
  // get the list of products
  // render out the product list to the element
}
