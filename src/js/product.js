import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam,loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("#main-header","#main-footer","../partials/headerInternal.html","../partials/footer.html");

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
