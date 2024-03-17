import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource, productDetailsTemplate) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.productDetailsTemplate = productDetailsTemplate;
  }
  addToCart() {
    cartIconAnimation()
    
    // Retrieve the current cart from localStorage
    let cart = getLocalStorage("so-cart") || [];

    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex((item) => item.Id === this.product.Id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].Quantity += 1;
    } else {
      const newItem = { ...this.product, Quantity: 1 };
      cart.push(newItem);
    }

    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = this.productDetailsTemplate(this.product);
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails()

    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
    }
}

function cartIconAnimation() {
  const cartIcon = document.querySelector('.cart');

  cartIcon.classList.add('cart-icon-animate');

  setTimeout(() => {
    cartIcon.classList.remove('cart-icon-animate');
  }, 500); // Match the duration of the animation
}