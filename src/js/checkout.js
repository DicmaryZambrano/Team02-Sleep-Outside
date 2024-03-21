import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter(
  "#main-header",
  "#main-footer",
  "../partials/headerInternal.html",
  "../partials/footer.html",
);

const checkoutProcess = new CheckoutProcess("so-cart",".summary")

checkoutProcess.init();