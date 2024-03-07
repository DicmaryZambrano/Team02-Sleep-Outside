import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  addToCart() {
    // Retrieve the current cart from localStorage
    let cart = getLocalStorage("so-cart");
    if (!cart) {
      // If there's no cart, initialize it as an empty array
      cart = [];
    } else if (!Array.isArray(cart)) {
      // If the retrieved cart is not an array, convert it into an array
      cart = [cart];
    }
    
    // Add the new product to the cart array
    cart.push(this.product);
    
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = productDetailsTemplate(this.product);
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

function productDetailsTemplate(product) {
  const newProduct = 
  `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"
        alt="${product.Name}"
      />

      <p class="product-card__price">${product.FinalPrice}</p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart">Add to Cart</button>
      </div>
    `
  return newProduct;
}
