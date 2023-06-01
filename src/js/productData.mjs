const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function getMultipleData(categories) {
  const categoriesPromises = categories.map(category => fetch(baseURL + `products/search/${category}`));

  const res = await Promise.all(categoriesPromises);

  const data = await Promise.all(res.map(productCategoryListPromise => {
    if (productCategoryListPromise.ok) return productCategoryListPromise.json();
  }));

  const result = await Promise.all(data.map(productData => productData.Result));

  return result.flat(1);
}

export async function findProductById(id) {
  // const products = await getData(category);
  // return products.find((item) => item.Id === id);
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}
