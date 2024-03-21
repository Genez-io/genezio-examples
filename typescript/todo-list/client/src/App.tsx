import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Register from "./views/Register";
import AllTasks from "./views/AllTasks";
import Auth from "./layouts/Auth";
import Admin from "./layouts/Admin";
import React from "react";
import { AuthService } from "@genezio/auth";

export default function App() {
  React.useEffect(() => {
    try {
      AuthService.getInstance().setTokenAndRegion("<token>", "<region>");
    } catch (error: any) {
      console.log("Error: ", error.message);
      localStorage.clear();
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth element={<Login />} />} />
        <Route path="/register" element={<Auth element={<Register />} />} />
        <Route
          path="/admin/all-tasks"
          element={<Admin element={<AllTasks />} />}
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
