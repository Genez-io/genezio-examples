import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthService } from "@genezio/auth";

AuthService.getInstance().setTokenAndRegion(
  "0-2ezix4nnq5h3gfejjlbfeptkyu0jlwoe",
  "us-east-1"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
