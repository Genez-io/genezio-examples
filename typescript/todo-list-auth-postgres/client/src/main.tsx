import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthService } from "@genezio/auth";

// TODO: Add your token and region from the Genezio dashboard https://app.genez.io/dashboard
AuthService.getInstance().setTokenAndRegion("<token>", "<region>");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
