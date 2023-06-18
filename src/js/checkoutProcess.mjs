import { checkout } from "./externalServices.mjs";
import { currencyConverter, getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";
import { formDataToJSON } from "./utils.mjs";


const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  },
  calculateItemSummary: function () {
    // calculate and display the total amount of the items in the cart, and the number of items.

    let total = 0;
    if (this.list.length > 0) {
      this.list.forEach(({FinalPrice, Quantity}) => {
        total += FinalPrice * Quantity;
      });
    }

    const numItems = this.list.reduce((accumulator, { Quantity }) => accumulator + Quantity, 0)

    this.outputSelector.querySelector("#numItems").innerHTML = numItems;
    this.outputSelector.querySelector("#subTotal").innerHTML =
      currencyConverter(total);
    this.itemTotal = total;
  },
  calculateOrdertotal: function () {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

    let shipping = 0;

    // revised the code in comments above to fix the empty basket issue.
    
    this.list.forEach((item, index) => {
      this.list[index] = 0; // Assign 0 to the item in the array
      if (index === 0) {
        shipping += 10;
      } else {
        shipping += 2;
      }
    });

    const RATE = 0.06;
    let tax = this.itemTotal * RATE;

    this.shipping = shipping;
    this.tax = tax;

    this.outputSelector.querySelector("#shipping").innerHTML = currencyConverter(shipping);
    this.outputSelector.querySelector("#tax").innerHTML = currencyConverter(tax);

    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // once the totals are all calculated display them in the order summary page
    const orderTotal = this.itemTotal + this.shipping + this.tax;

    this.outputSelector.querySelector("#orderTotal").innerHTML = currencyConverter(orderTotal);
  },

  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    let formData = formDataToJSON(form); //return js object
    let items = packageItems(this.list);

    let data = {
      orderDate: new Date(),
      ...formData,
      items: items,
      orderTotal: this.itemTotal,
      shipping: this.shipping,
      tax: this.tax,
    };
    console.log(data);

    try {
      const res = await checkout(data);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");

    } catch (err) {
      console.log(err);
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }

      console.log(err);
    }

    // call the checkout method in our externalServices module and send it our data object.
  },
};

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map((item, index) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
  }))
}

export default checkoutProcess;
