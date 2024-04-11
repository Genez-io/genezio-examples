import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Register from "./views/Register";
import AllCodes from "./views/AllCodes";
import Auth from "./layouts/Auth";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Auth
              authetificatedRedirect="/admin/all-codes"
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
              authetificatedRedirect="/admin/all-codes"
              unauthetificatedRedirect="/register"
            >
              <Register />
            </Auth>
          }
        />
        <Route
          path="/admin/all-codes"
          element={
            <Auth
              authetificatedRedirect="/admin/all-codes"
              unauthetificatedRedirect="/login"
            >
              <AllCodes />
            </Auth>
          }
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
