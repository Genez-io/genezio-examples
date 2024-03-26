import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthService } from "@genezio/auth";

AuthService.getInstance().setTokenAndRegion(
  "0-jku5rahinzvfs2ci7dil6566by0vvgpq",
  "us-east-1"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
