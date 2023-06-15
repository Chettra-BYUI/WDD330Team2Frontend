const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "serviceError", message: data};
  }
}

export function getProductsByCategory(category = "tents") {
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function getMultipleData(categories) {
  const categoriesPromises = categories.map((category) =>
    fetch(baseURL + `products/search/${category}`)
  );

  const res = await Promise.all(categoriesPromises);

  const data = await Promise.all(
    res.map((productCategoryListPromise) => {
      if (productCategoryListPromise.ok)
        return productCategoryListPromise.json();
    })
  );

  const result = await Promise.all(
    data.map((productData) => productData.Result)
  );

  return result.flat(1);
}

export async function findProductById(id) {
  // const products = await getProductsByCategory(category);
  // return products.find((item) => item.Id === id);
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(creds) {
  // console.log(creds, "check");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds)
  };

  const response = await fetch(baseURL + "login", options).then(convertToJson);

  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };

  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  console.log(response, "response");
  console.log("checking");
  return response;
}
