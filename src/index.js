import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { CartProvider } from "./context/CartContext"; // 👈 Importa el contexto

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider> {/* 👈 Envolvemos toda la app */}
      <App />
    </CartProvider>
  </React.StrictMode>
);
