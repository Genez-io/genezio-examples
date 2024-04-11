import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthService } from "@genezio/auth";

// TODO: Add your token and region from the Genezio dashboard https://app.genez.io/dashboard
AuthService.getInstance().setTokenAndRegion(
  "0-4mou4m6b3hoivnojjg5ydfcxlu0hkuaa",
  "us-east-1"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
