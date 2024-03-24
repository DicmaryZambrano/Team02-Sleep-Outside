import { loadHeaderFooter } from "./utils.mjs";
import UserManager from "./UserManager.mjs";

loadHeaderFooter(
  "#main-header",
  "#main-footer",
  "../partials/headerInternal.html",
  "../partials/footer.html",
);

const userManager = new UserManager();

const form = document.forms["loginForm"];

document.querySelector("#loginSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    userManager.login(form);
  }
  form.reportValidity();
});
