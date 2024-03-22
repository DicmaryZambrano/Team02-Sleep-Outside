import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(storage, listElement, cartItemTemplate) {
    this.storage = storage;
    this.listElement = listElement;
    this.cartItemTemplate = cartItemTemplate;
  }

  init() {
    const cartItems = getLocalStorage(this.storage) || [];

    console.log(cartItems)

    if(cartItems.length != 0){
      const cartTotal = document.querySelector(".cart-footer");
      cartTotal.classList.remove("hide")
    }

    renderListWithTemplate(this.cartItemTemplate, this.listElement, cartItems);

    const total = this.calculateTotal(cartItems)
    this.displayTotal(total)
  }

  calculateTotal(cartItems) {
    var total = 0
    cartItems.forEach(item => {
      total += item.FinalPrice *  item.Quantity
    });
    return total
  }
  displayTotal(total) {
    document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
  }
}
