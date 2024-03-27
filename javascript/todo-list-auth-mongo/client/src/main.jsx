import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthService } from "@genezio/auth";

// TODO: Add your token and region from the Genezio dashboard https://app.genez.io/dashboard
AuthService.getInstance().setTokenAndRegion("0-3aaapbe5m5pq34v6p3sdani5oi0qcyvz", "us-east-1");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
