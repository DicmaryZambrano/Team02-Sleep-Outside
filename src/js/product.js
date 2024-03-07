import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(newProduct) {
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
  cart.push(newProduct);
  
  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
