import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Ensure cartItems is an array

  //BA: added CartId to each item
  for (let i = 0; i < cartItems.length; i++) {
    cartItems[i].CartId = i+1;
  }

  //BA: addEventListener forEach .cart-card__x
  //BA: doesn't work with var cartX = document.querySelectorAll(".cart-card__x");
  var cartX = document.getElementsByClassName("cart-card__x");
  
  //BA:gives correct list, but it's HTMLCollection
  console.log(cartX); 

  //BA: doesn't work
  for (let i = 0; i < cartX.length; i++){
    console.log(cartX[i].cartId);  
    cartX[i].addEventListener("click", (e) => {
    //BA: trying to remove the element
      e.closest("li").remove();
    //BA: trying to remove the removed item from the localstorage
      removeFromCart(cartItems, e.getAttribute("data-id"));
      console.log(e.getAttribute("data-id"));  
    });
  };

  //BA: none of these work, cartXArr is empty
  //const cartXArr = Array.from(cartX);
  //let cartXArr = Array.prototype.slice.call(cartX);
  let cartXArr = [...cartX];
  console.log(cartXArr); 

  cartXArr.forEach(function (el) {
    console.log(el); 
    el.addEventListener("click", (e) => {
      //BA: trying to remove the element
        e.closest("li").remove();
      //BA: trying to remove the removed item from the localstorage
        removeFromCart(cartItems, e.getAttribute("data-id"));
        console.log(e.getAttribute("data-id"));  
      });

  });
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function removeFromCart(cartItems, cartId) {
  
  cartItems = cartItems.filter(function( obj ) {
    return obj.CartId !== cartId;
  });
  setLocalStorage("so-cart", cartItems);
  return cartItems;
}

//BA: added cart-card__x button with data-id
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <button class="cart-card__x" data-id="${item.CartId}">X</button>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();