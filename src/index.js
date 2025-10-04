// Entry point for the OrbitSix React application
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Create a root element for React 18's concurrent features
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main App component wrapped in StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
