import { getMultipleData } from "./productData.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  const isKeyExists = localStorage.getItem(key);

  if (isKeyExists) {
    const cartItems = getLocalStorage(key);
    cartItems.push(data);
    localStorage.setItem(key, JSON.stringify(cartItems))
  } else {
    localStorage.setItem(key, JSON.stringify([data]));
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get parameters function
export function getParam(param = "product") {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function renderList(products, productListElement) {
//   const htmlStrings = products.map((product) => productCardTemplate(product));

//   productListElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
// }

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  } 
  const htmlStrings = list.map((item) => templateFn(item));
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true){
  if (clear) {
    parentElement.innerHTML = "";
  } 
  const html = await templateFn(data);
  parentElement.insertAdjacentHTML(position, html);
  if (callback) {
    callback(data);
  }

}

function loadTemplate(path) {
  return async function () {
    const response = await fetch(path);
    if (response.ok) {
      const html = await response.text();
      return html;
    }
  } 
}

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#footer");

  const searchInputFunction = async () => {
    const productList = await getMultipleData(["backpacks", "hammocks", "tents", "sleeping-bags"]);

    const searchInputElement = document.querySelector(".search__input");
    const searchResultElement = document.querySelector(".search__results");

    function searchResultProductTemplate(product) {
      return `<li class="search__result"><a href="/product_pages/index.html?product=${product.Id}">${product.Name}</a></li>`;
    }

    searchInputElement.addEventListener("input", e => {
      const filteredList = productList.filter((product, index) => product.Name.toLowerCase().includes(e.target.value) && index < 5);

      if (filteredList.length > 0 && e.target.value) {
        renderListWithTemplate(searchResultProductTemplate, searchResultElement, filteredList);
      } else if (filteredList.length > 0 && !e.target.value) {
        searchResultElement.innerHTML = "";
      } else {
        const messageTemplate = () => `<li class="search__result">No product found</li>`;

        renderWithTemplate(messageTemplate, searchResultElement);
      }
    });
  };

  renderWithTemplate(headerTemplateFn, headerEl, undefined, searchInputFunction);
  renderWithTemplate(footerTemplateFn, footerEl);
}
