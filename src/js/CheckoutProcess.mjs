import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(storage, listElement) {
    this.storage = storage;
    this.listElement = listElement;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.storage) || [];
    this.calculateItemSummary()
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.

    if(this.list.length === 0){
      const summary = document.querySelector(this.listElement);
      summary.innerHTML = `<p>The cart is empty</p>`
    }
    else {
      this.calculateOrdertotal()
    }
  }

  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.calculateSubtotal()
    this.calculateTax()
    this.calculateShipping()

    this.orderTotal = this.itemTotal + this.tax + this.shipping
    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    this.displaySubtotal()
    this.displayTax()
    this.displayShipping()

    document.querySelector(".summary-total").innerHTML = `Total: $${this.orderTotal}`;
  }

  calculateSubtotal() {
    this.list.forEach(item => {
      this.itemTotal += item.FinalPrice *  item.Quantity
    });
  }
  displaySubtotal() {
    document.querySelector(".summary-subtotal").innerHTML = `Subtotal: $${this.itemTotal}`;
  }

  calculateTax() {
    this.tax = this.itemTotal * 0.06
  }
  displayTax() {
    document.querySelector(".summary-tax").innerHTML = `Tax: $${this.tax}`;
  }

  calculateShipping() { 
    var quantity = 0

    this.list.forEach(item => {
      quantity += item.Quantity
    });

    for (let index = 0; index < quantity; index++) {
      if(index === 0) {
        this.shipping += 10 
      }
      else{
        this.shipping += 2 
      }
    }
  }
  displayShipping() {
    document.querySelector(".summary-shipping").innerHTML = `Shipping: $${this.shipping}`;
  }
}
