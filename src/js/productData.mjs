function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  const dataUrl = new URL(`../json/${category}.json`, import.meta.url).href;
  return fetch(dataUrl)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
