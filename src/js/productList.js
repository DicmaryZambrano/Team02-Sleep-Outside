import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter(
  "#main-header",
  "#main-footer",
  "../partials/headerInternal.html",
  "../partials/footer.html",
);

const productCardFunc = function (product) {
  return ` 
  <li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Images.PrimaryMedium}
        alt=${product.Name}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.ListPrice}</p>
    </a>
  </li>
  `;
};

function formatCategory(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const productCategory = getParam("category");
const dataSource = new ExternalServices();
const productList = new ProductList(
  productCategory,
  dataSource,
  ".product-list",
  productCardFunc,
);

const categoryElement = document.querySelector(".product-category");
categoryElement.append(formatCategory(productCategory));
productList.init();
