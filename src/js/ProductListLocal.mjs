import ProductData from "./ProductDataLocal.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, listElement, productCardTemplate, filter= true) {
    this.category = category;
    this.products = [];
    this.dataSource;
    this.listElement = listElement;
    this.productCardTemplate = productCardTemplate;
    this.filter = filter;
  }

  filterProducts() {
    const uniqueProducts = [];
    const productNamesSet = new Set();
  
    this.products.forEach(product => {
      // Split the product name and take the first part to get the base product name
      const baseProductName = product.Name.split(' - ')[0];
      // Check if the base product name is already in our set
      if (!productNamesSet.has(baseProductName)) {
        uniqueProducts.push(product);
        productNamesSet.add(baseProductName);
      }
    });

    this.products = uniqueProducts;
  }

  renderProductList() {
    renderListWithTemplate(this.productCardTemplate, this.listElement, this.products);
  }

  async init() {
    this.dataSource = new ProductData(this.category);
    this.products = await this.dataSource.getData();
    if (this.filter) {
      this.filterProducts()
    }
    this.renderProductList()
  }
}
