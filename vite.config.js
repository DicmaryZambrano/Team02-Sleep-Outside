import { resolve } from "path";
import { defineConfig } from "vite"; // error

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        listing: resolve(__dirname, "src/product_listing/index.html"),
        success: resolve(__dirname, "src/checkout/success.html"),
        login: resolve(__dirname, "src/user/login.html"),
        register: resolve(__dirname, "src/user/register.html"),
        login_success: resolve(__dirname, "src/user/loginSuccess.html"),
        register_success: resolve(__dirname, "src/user/registerSuccess.html"),
      },
    },
  },
});
