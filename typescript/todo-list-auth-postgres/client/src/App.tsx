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
              authetificatedRedirect="/admin/all-tasks"
              unauthetificatedRedirect="/login"
            >
              <Login />
            </Auth>
          }
        />
        <Route
          path="/register"
          element={
            <Auth
              authetificatedRedirect="/admin/all-tasks"
              unauthetificatedRedirect="/register"
            >
              <Register />
            </Auth>
          }
        />
        <Route
          path="/admin/all-tasks"
          element={
            <Auth
              authetificatedRedirect="/admin/all-tasks"
              unauthetificatedRedirect="/login"
            >
              <AllTasks />
            </Auth>
          }
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
