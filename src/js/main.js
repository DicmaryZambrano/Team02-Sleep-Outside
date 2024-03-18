import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("#main-header","#main-footer","../partials/header.html","../partials/footer.html");
// Added the event listener to the DOMContentLoaded event to ensure that the first time feature works
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('registerModal');
  const closeButton = document.querySelector('.close-button');

  const showModal = () => {
    modal.style.display = 'flex';
    // Set a cookie for 30 days to not show the modal again
    document.cookie = "visited=true; max-age=" + 30*24*60*60;
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  closeButton.addEventListener('click', closeModal);

  // Check if the user has visited before
  if (!document.cookie.split('; ').find(row => row.startsWith('visited'))) {
    showModal();
  }
});


const productCardFunc = function (product) {
  return ` 
  <li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Image}
        alt=${product.Name}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.ListPrice}</p>
    </a>
  </li>

  
  
  `;
};

const productList = new ProductList("tents", ".product-list", productCardFunc);

productList.init();
