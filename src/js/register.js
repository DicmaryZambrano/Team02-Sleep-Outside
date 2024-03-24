import { loadHeaderFooter, alertMessage, removeAllAlerts } from "./utils.mjs";
import UserManager from "./UserManager.mjs";

loadHeaderFooter(
  "#main-header",
  "#main-footer",
  "../partials/headerInternal.html",
  "../partials/footer.html",
);

function validatePassword() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords do not match");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
}
const form = document.forms["registerForm"];
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const avatarInput = document.getElementById("avatar");
const userManager = new UserManager();

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);

document.querySelector("#registerSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    userManager.registerUser(form);
  } else {
    if (avatarInput.files.length === 0) {
      removeAllAlerts();
      alertMessage("Please upload an avatar.");
    }
  }
  form.reportValidity();
});
