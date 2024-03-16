import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(storage, listElement, cartItemTemplate) {
    this.storage = storage;
    this.listElement = listElement;
    this.cartItemTemplate = cartItemTemplate;
  }

  init() {
    const cartItems = getLocalStorage(this.storage) || [];
    renderListWithTemplate(this.cartItemTemplate, this.listElement, cartItems);
  }
}
