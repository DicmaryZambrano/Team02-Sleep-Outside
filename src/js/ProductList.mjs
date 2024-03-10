import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, listElement, productCardTemplate) {
    this.category = category;
    this.products = [];
    this.dataSource;
    this.listElement = listElement;
    this.productCardTemplate = productCardTemplate;
  }

  filterTents() {
    const uniqueTents = [];
    
    this.products.forEach(product => {
      const isUnique = !uniqueTents.some(uniqueProduct => uniqueProduct.Name === product.Name);
      if (isUnique) {
        uniqueTents.push(product);
      }
    });

    this.products = uniqueTents.slice(0, 4);
  }

  renderProductList() {
    renderListWithTemplate(this.productCardTemplate, this.listElement, this.products);
  }

  async init() {
    this.dataSource = new ProductData(this.category);
    this.products = await this.dataSource.getData();
    this.filterTents()
    this.renderProductList()
  }
}
