import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter("#main-header","#main-footer","../partials/headerInternal.html","../partials/footer.html");

const cartTemplate = function cartItemTemplate(item) {
  const newItem = 
  `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Quantity:${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

const shoppingCart = new ShoppingCart("so-cart",".product-list",cartTemplate);
shoppingCart.init();