import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("#main-header","#main-footer","../partials/header.html","../partials/footer.html");

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
