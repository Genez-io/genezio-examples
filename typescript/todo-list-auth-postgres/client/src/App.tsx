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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Auth
              element={<Login />}
              authetificatedRedirect="/admin/all-tasks"
              unauthetificatedRedirect="/login"
            />
          }
        />
        <Route
          path="/register"
          element={
            <Auth
              element={<Register />}
              authetificatedRedirect="/admin/all-tasks"
              unauthetificatedRedirect="/register"
            />
          }
        />
        <Route
          path="/admin/all-tasks"
          element={
            <Auth
              element={<AllTasks />}
              authetificatedRedirect="/admin/all-tasks"
              unauthetificatedRedirect="/login"
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
