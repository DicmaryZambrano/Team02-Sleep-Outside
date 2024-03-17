import ProductListLocal from "./ProductListLocal.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("#main-header","#main-footer","../partials/header.html","../partials/footer.html");

const categoryCardFunc = function (category) {
  return ` 
  <li class="product-card">
    <a href="product_listing/index.html?category=${category.Path}">
      <img
        src=${category.Image}
        alt=${category.Alt}
      />
      <h2 class="card__name">${category.Name}</h2>
    </a>
  </li>
  `;
};

const productList = new ProductListLocal("product-categories", ".product-list", categoryCardFunc);

productList.init();
