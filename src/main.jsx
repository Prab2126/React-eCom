import { createRoot } from "react-dom/client";
import { ProductProvider } from "./Context/Product-provider";

import "./global.scss";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <App />
  </ProductProvider>
);
