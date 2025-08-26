import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS (includes Popper.js for dropdowns)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
