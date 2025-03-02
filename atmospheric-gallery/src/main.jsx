import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Remove initial loader once the app is rendered
const removeInitialLoader = () => {
  const initialLoader = document.getElementById("initial-loader");
  if (initialLoader) {
    initialLoader.style.display = "none";
  }
};

// Create root and render app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove loader after a short delay to ensure smooth transition
setTimeout(removeInitialLoader, 500);

// Register service worker for better performance if supported
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
