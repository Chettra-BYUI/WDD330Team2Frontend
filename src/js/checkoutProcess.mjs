import { currencyConverter, getLocalStorage } from "./utils.mjs";

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
      this.list.forEach((cartItem) => {
        total += cartItem.FinalPrice;
      });
    }
    this.outputSelector.querySelector("#numItems").innerHTML = this.list.length;
    this.outputSelector.querySelector("#subTotal").innerHTML =
      currencyConverter(total);
    this.itemTotal = total;
  },
  calculateOrdertotal: function () {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

    let shipping = 0;

    this.list.forEach((item, index) => {
      if (index == 0) {
        shipping += 10;
      } else {
        shipping += 2;
      }
    });

    const RATE = 0.06;
    let tax = this.itemTotal * RATE;

    this.shipping = shipping;
    this.tax = tax;

    this.outputSelector.querySelector("#shipping").innerHTML =
      currencyConverter(shipping);
    this.outputSelector.querySelector("#tax").innerHTML =
      currencyConverter(tax);

    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // once the totals are all calculated display them in the order summary page
    const orderTotal = this.itemTotal + this.shipping + this.tax;

    this.outputSelector.querySelector("#orderTotal").innerHTML =
      currencyConverter(orderTotal);
  },
};

export default checkoutProcess;
